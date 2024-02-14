import crypto from "crypto";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import { validationResult, matchedData } from "express-validator";

import { User, Password } from "../models/usersModel.js";

import HttpError from "../models/http-errors.js";

import {
  getToken,
  deleteFile,
  getHash,
  sendFileToCloudinary,
  deleteFileInCloudinary,
  checkPassword,
  getGeolocation,
  transporter
} from "../common/index.js";

dotenv.config();

// looking for all users in the data base
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// looking for one user via ID
const getOneUser = async (req, res, next) => {
  let user;

  try {
    user = await User.findById(req.params.id);
  } catch (error) {
    return next(new HttpError("Cant find user", 404));
  }
  res.json(user);
};


const signup = async (req, res, next) => {
  // express-validator
  const result = validationResult(req);

  const formData = req.body;

  // if there's an error so far, display it and delete photo in storage
  if (result.errors.length > 0) {
    deleteFile(req.file.path);
    return next(new HttpError(JSON.stringify(result), 422));
  }

  const matchData = matchedData(req);

  //error if there is no photo
  if (!req.file) {
    return next(new HttpError("Photo is missing", 423));
  }

  // saving image to cloudinary
  const response = await sendFileToCloudinary(req.file.path, 'BarFly');

  const photo = {
    cloudinaryPublicId: response.public_id,
    url: response.secure_url,
  };

  // important for unlocking user:
  // create activation data
  const unlockKey = crypto.randomUUID();
  // 3 days in milliseconds
  const unlockEndsAt = +new Date() + 1000 * 60 * 60 * 24 * 3;

  // get geo data
  const address =
    matchData.street + ", " + matchData.zip + ", " + matchData.city;
  const geo = await getGeolocation(address);

  // compile user object with retrieved & calculated data
  const createdUser = new User({
    ...formData,
    ...matchData,
    photo,
    unlockKey,
    unlockEndsAt,
    geo
  });

  let newUser;
  

  try {
    // start session/transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // save in context of transaction
    newUser = await createdUser.save({ session });

    // save password in reference to user
    const createdPassword = new Password({
      user: newUser._id,
      password: getHash(req.body.password),
    });

    await createdPassword.save({ session });

    const activationLink = `${process.env.HOST}/unlock?unlockKey=${encodeURIComponent(
      unlockKey
    )}`;

    // sending email to new user with activation link
    const mailSent = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: req.body.email,
      subject: 'Account Aktivierung BarFly',
      html: `<p>Hallo,</p><p>Klicke den folgenden Link um Deinen Account freizuschalten:</p><a href="${activationLink}">${activationLink}</a>`,
    });

    // abort if message cannot be sent
    if (!mailSent) {
      await session.abortTransaction();
      return next(new HttpError(error, 500));
    }

    // commit transaction and save in this context
    await session.commitTransaction();
  } catch (error) {
    deleteFile(req.file.path);
    return next(new HttpError(error, 422));
  }

  
  res.send(newUser);
};

const login = async (req, res, next) => {
  const { login, password } = req.body;
  let foundUser;
  try {
    // accepting email or nickname for login
    foundUser = await User.findOne({
      $or: [{ nickname: login }, { email: login }],
    });

    // user has to activate account via email link first
    if(!foundUser.activated) {
      return next(new HttpError('User not activated yet', 401));
    }

    // checking password (different collection)
    const foundPassword = await Password.findOne({ user: foundUser._id });

    const isPasswordOk = checkPassword(password, foundPassword.password);

    if (!isPasswordOk) {
      return next(new HttpError("Wrong login or password", 401));
    }
 
    // creating a token
    const token = getToken({ id: foundUser._id });

    // send token
    res.send(token);
  } catch {
    return next(new HttpError("Cannot login user", 400));
  }
};


const unlock = async (req, res, next) => {

  // receiving unlockKey from request headers
  const unlockKey  = req.query.unlockKey;
  console.log(unlockKey);
  if (!unlockKey) {
    return next(new HttpError('no header', 401));
  }

  // look for user with unlockKey
  let foundUser;
  try {
    foundUser = await User.findOne({ unlockKey });
    console.log(foundUser);

    if (+new Date() > foundUser.unlockEndsAt) {
      return next(new HttpError('invalid unlock key', 401));
    }

    // activate account, reset info, save updated user
    foundUser.activated = true;
    foundUser.unlockEndsAt = 0;
    foundUser.unlockKey = '';
    await foundUser.save();
  } catch {
    return next(new HttpError('Cannot activate user', 400));
  }

  res.send('Activation successful');
};



const editUser = async (req, res, next) => {
  // user has to be logged in or be an admin
  const { id } = req.params;

  const result = validationResult(req);

  if (result.errors.length > 0) {
    return next(new HttpError(JSON.stringify(result), 422));
  }

  const matchData = matchedData(req);

  let user;
  try {
    user = await User.findById(id);
    if (!user) {
      return next(new HttpError('Cant find user', 404));
    }
  } catch (error) {
    return next(new HttpError('Cant find user', 404));
  }

  // checking for admin rights
  if (!req.verifiedUser.isAdmin) {
    // is not an admin:
    if (req.verifiedUser._id != id) {
      return next(new HttpError('not allowed to update user', 403));
    }
  }

  Object.assign(user, matchData);

  // replacing image if there's one
  if (req.file) {
    
    // uploading new image
    const response = await sendFileToCloudinary(req.file.path, 'BarFly');

    // deleting old image
    await deleteFileInCloudinary(user.photo.cloudinaryPublicId);

    user.photo = {
      cloudinaryPublicId: response.public_id,
      url: response.secure_url,
    };
  }

  // recalculate geo data
  const address = user.street + ', ' + user.zip + ' ' + user.city;
  user.geo = await getGeolocation(address);

  const changedUser = await user.save();

  // send new user object
  res.json(changedUser);
};


const changePassword = async (req, res, next) => {
  
  const result = validationResult(req);

  if (result.errors.length > 0) {
    return next(new HttpError(JSON.stringify(result), 422));
  }

  const matchData = matchedData(req);

  const { oldPassword, newPassword } = matchData;

  const foundPassword = await Password.findOne({ user: req.verifiedUser._id });

  // checking if the old and provided passwords match
  const isPasswordOk = checkPassword(oldPassword, foundPassword.password);
  if (!isPasswordOk) {
    return next(new HttpError('old password does not match', 401));
  }

  // set new password
  foundPassword.password = getHash(newPassword);
  await foundPassword.save();

  res.send('password changed successfully');
};


const deleteUser = async (req, res, next) => {
  // user has to be logged in
  const { id } = req.params;

  console.log(req.verifiedUser);
  
  // find user
  let user;
  try {
    user = await User.findById(id);
    if (!user) {
      return next(new HttpError('Cant find user', 404));
    }
  } catch (error) {
    return next(new HttpError('Cant find user', 404));
  }

  // looking if user has admin rights
  if (!req.verifiedUser.isAdmin) {
    // if not and it's not the same user:
    if (req.verifiedUser._id != id) {
      return next(new HttpError('not allowed to delete user', 403));
    }
  }

  // deleting everything attached to user:

  const publicId = user.photo.cloudinaryPublicId;


  try {
    // starting session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    let search = { user: id };

    // delete password
    await Password.findOneAndDelete( search, { session });

    //  delete user
    await user.deleteOne({ session });

    // confirm transaction
    await session.commitTransaction();

    // delete image in cloudinary as soon as user is deleted
    await deleteFileInCloudinary(publicId);
  } catch (error) {
    console.log('error is: ', error);
    return next(new HttpError('error while deleting', 500));
  }

  res.send('user deleted successfully');
};


export { signup, login, getAllUsers, getOneUser, unlock, editUser, changePassword, deleteUser };