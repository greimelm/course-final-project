import crypto from "crypto";
import mongoose from "mongoose";
import { validationResult, matchedData } from "express-validator";

import { Location, LocationPassword } from "../models/locationModel.js";
import { FavouriteLocation } from "../models/favouriteLocationModel.js";

import HttpError from "../models/http-errors.js";

import {
  getToken,
  deleteFile,
  getHash,
  sendFileToCloudinary,
  deleteFileInCloudinary,
  checkPassword,
  getGeolocation,
} from "../common/index.js";

const locationSignup = async (req, res, next) => {
  // express-validator
  const result = validationResult(req);

  const formData = req.body;
  // console.log(req.body);  
  // console.log(formData);
  // console.log(formData.name);
  console.log(formData.categories);


  const categoryArr = formData.categories.split(',').map(category => category.trim());

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

  // important for unlocking location:
  // create activation data
  const unlockKey = crypto.randomUUID();
  // 3 days in milliseconds
  const unlockEndsAt = +new Date() + 1000 * 60 * 60 * 24 * 3;

  // get geo data
  const address =
    matchData.street + ", " + matchData.zip + ", " + matchData.city;
  const geo = await getGeolocation(address);

  const createdLocation = new Location({
    // req.body enthält ungeprüftes statement, das vom express-validator ignoriert wird; matchData überschreibt mit geprüften Daten
    ...req.body,
    ...matchData,
    categories: categoryArr,
    photo,
    unlockKey,
    unlockEndsAt,
    geo,
  });

  let newLocation;
  // 
  // eigenes Psswort oder über owner?
  // 
  
  try {
    // Session und Transaction starten
    const session = await mongoose.startSession();
    session.startTransaction();

    // Speichern im Kontext der Transaction
    newLocation = await createdLocation.save({ session });

    const createdLocationPassword = new LocationPassword({
      location: newLocation._id,
      locationPassword: getHash(req.body.locationPassword),
    });

    // save in context of transaction
    await createdLocationPassword.save({ session });

    // confirm transaction
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    deleteFile(req.file.path);
    return next(new HttpError(error, 422));
  }

  res.send(newLocation);
};

// 
// login?? extra oder über owner?
// 

const getAllLocations = async (req, res) => {
  const locations = await Location.find({});
  res.json(locations);
};

const getOneLocation = async (req, res, next) => {
  let location;

  try {
    location = await Location.findById(req.params.id);
  } catch (error) {
    return next(new HttpError("Cant find location", 404));
  }

  res.json(location);
};

//
// unlock/confirm ???
// 

const editLocation = async (req, res, next) => {
  // 
  // id muss location id sein, weil darüber in collection gesucht wird
  const { id } = req.params;

  const result = validationResult(req);

  if (result.errors.length > 0) {
    return next(new HttpError(JSON.stringify(result), 422));
  }

  const matchData = matchedData(req);

  // search for user
  // 
  // 
  // TODO: warum 2x fehler catchen???
  let location;
  try {
    location = await Location.findById(id);
    if (!location) {
      return next(new HttpError('Cant find user', 404));
    }
  } catch (error) {
    return next(new HttpError('Cant find user', 404));
  }

  Object.assign(location, matchData);

  // replacing image if there's one
  if (req.file) {
    
    // uploading new image
    const response = await sendFileToCloudinary(req.file.path, 'BarFly');

    // deleting old image
    await deleteFileInCloudinary(location.photo.cloudinaryPublicId);

    location.photo = {
      cloudinaryPublicId: response.public_id,
      url: response.secure_url,
    };
  }

  // recalculate geo data
  const address = location.street + ', ' + location.zip + ' ' + location.city;
  user.geo = await getGeolocation(address);

  const changedLocation = await location.save();

  // send new user object
  res.json(changedLocation);
};

// 
// wie wird changePassword gehandlet?
// 

const deleteLocation = async (req, res, next) => {
  const { id } = req.params;

  console.log(req.verifiedUser);
  
  // find user
  let location;
  try {
    location = await Location.findById(id);
    if (!location) {
      return next(new HttpError('Cant find user', 404));
    }
  } catch (error) {
    return next(new HttpError('Cant find user', 404));
  }

// 
// muss zwar nicht checken ob admin, aber ob owner
// 

  // // looking if user has admin rights
  // if (!req.verifiedUser.isAdmin) {
  //   // if not:
  //   if (req.verifiedUser._id != id) {
  //     return next(new HttpError('not allowed to delete user', 403));
  //   }
  // }

  // deleting everything attached to user:

  const publicId = location.photo.cloudinaryPublicId;


  try {
    // starting session and transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    
    // delete in favourite locations
    let search = { location: id };
    await FavouriteLocation.deleteMany( search, { session });
    
    // delete/ deactivate in tours
    // // delete favourite tours
    // await FavouriteTour.deleteMany( search, { session });

    // to be decided wie login(und damit passwörter) gehandlet wird 
    // // delete password
    // await Password.findOneAndDelete( search, { session });

    //  delete location
    await location.deleteOne({ session });

    // confirm transaction
    await session.commitTransaction();

    // delete image in cloudinary
    await deleteFileInCloudinary(publicId);
  } catch (error) {
    console.log('error is: ', error);
    return next(new HttpError('error while deleting', 500));
  }

  res.send('location deleted successfully');
};

export { locationSignup, getAllLocations, getOneLocation, editLocation, deleteLocation };