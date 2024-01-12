import crypto from "crypto";
import mongoose from "mongoose";
import { validationResult, matchedData } from "express-validator";

import { User, Password } from "../models/usersModel.js";
import { Location, LocationPassword } from "../models/locationModel.js";

import HttpError from "../models/http-errors.js";
import {
  getToken,
  deleteFile,
  getHash,
  sendFileToCloudinary,
  deleteFileInCloudinary,
  checkPassword,
  getGeolocation,
  getGeoDistances,
  deg2rad,
} from "../common/index.js";

const signup = async (req, res, next) => {
  // express-validator
  const result = validationResult(req);

  const formData = req.body;

  // console.log(req);
  console.log(formData);
  console.log(formData.nickname);
  // error message to client
  if (result.errors.length > 0) {
    deleteFile(req.file.path);  
    return next(new HttpError(JSON.stringify(result), 422));
  }

  const matchData = matchedData(req);
  console.log(matchData);

  //error if there is no image
  if (!req.file) {
    return next(new HttpError("Photo is missing", 422));
  }

  // saving image to cloudinary
  const response = await sendFileToCloudinary(req.file.path, "BarFly");

  const photo = {
    cloudinaryPublicId: response.public_id,
    url: response.secure_url,
  };

  // Aktivierungsdaten erzeugen
  const unlockKey = crypto.randomUUID();
  // 3 Tage in Millisekunden berechnet
  const unlockEndsAt = +new Date() + 1000 * 60 * 60 * 24 * 3;

  // Geodaten holen
  const address =
    matchData.street + ", " + matchData.zip + ", " + matchData.city;
  const geo = await getGeolocation(address);

  const createdUser = new User({
    // req.body enthält ungeprüftes statement, das vom express-validator ignoriert wird; matchData überschreibt mit geprüften Daten
    ...req.body,
    ...matchData,
    photo,
    unlockKey,
    unlockEndsAt,
  });

  let newUser;
  // TODO: Fehlerbehandlung
  try {
    // Session und Transaction starten
    const session = await mongoose.startSession();
    session.startTransaction();

    // Speichern im Kontext der Transaction
    newUser = await createdUser.save({ session });

    const createdPassword = new Password({
      user: newUser._id,
      password: getHash(req.body.password),
    });

    // speichern im Kontext der Transaction
    await createdPassword.save({ session });

    // Transaction bestötigen
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
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
 
     // checking password (different collection)
     const foundPassword = await Password.findOne({ user: foundUser._id });
     console.log(foundPassword);
 
     const isPasswordOk = checkPassword(password, foundPassword.password);
     console.log(isPasswordOk);
 
     if (!isPasswordOk) {
       return next(new HttpError("Wrong login or password", 401));
     }
 
     console.log(foundUser._id);
     // creating a token
     const token = getToken({ id: foundUser._id });
 
     console.log(token);
     // send token
     res.send(token);
    } catch {
     return next(new HttpError("Cannot login member", 400));
   }
};

 const getAllUsers = async (req, res) => {
    
    const users = await User.find({}).populate("favourites", "firstName lastName photo");
    res.json(users);
  };
  
  const getOneUser = async (req, res, next) => {
    let user;
  
    try {
      user = await User.findById(req.params.id).populate("favourites", "firstName lastName photo");
    } catch (error) {
      return next(new HttpError("Cant find member", 404));
    }
  
    res.json(user);
  };


export {
    signup,
    login,
    getAllUsers,
    getOneUser
};