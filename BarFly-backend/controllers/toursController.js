import mongoose from "mongoose";
import { validationResult, matchedData } from "express-validator";

import { Tour } from '../models/toursModel.js';
import { Location } from '../models/locationModel.js';
import { FavouriteTour } from '../models/favouriteTourModel.js';

import HttpError from "../models/http-errors.js";

import {
    getToken,
    deleteFile,
    getHash,
    sendFileToCloudinary,
    deleteFileInCloudinary,
    checkPassword,
    getGeolocation
} from "../common/index.js";

const createTour = (req, res, next) => {
    // express-validator
  const result = validationResult(req);

  const formData = req.body;

  // error message to client
  if (result.errors.length > 0) {
    deleteFile(req.file.path);
    return next(new HttpError(JSON.stringify(result), 422));
  }

  const matchData = matchedData(req);
  console.log(matchData);

  //error if there is no image
  if (!req.file) {
    // return next(new HttpError("Photo is missing", 422));
    // 
    // wenn kein foto hochgeladen, dann das profilbild der ersten location in der tour auswählen
    // 
  }
}