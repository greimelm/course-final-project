import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import multer from "multer";
import random from "random";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import nodemailer from 'nodemailer';

import HttpError from "../models/http-errors.js";

import { User } from '../models/usersModel.js';

dotenv.config();

const SALT_ROUNDS = 11;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});


const getHash = (plainText) => bcrypt.hashSync(plainText, SALT_ROUNDS);
  
const checkPassword = (password, hash) => bcrypt.compareSync(password, hash);


// token expiration set to 1 hour
const getToken = (payload, expiresIn = "1h") => jwt.sign(payload, process.env.JWT_KEY, { expiresIn });

const checkToken = async (req, res, next) => {
    // if browser requires preflight, let pass without checking
    if (req.method === "OPTIONS") {
      return next();
    }
  
    const { authorization } = req.headers;

    console.log(req.headers);
  
    if (!authorization) {
      // status 401 unauthorized
      return next(new HttpError('Invalid token', 401));
    }
    // check token
    const token = authorization.split(" ")[1];
  
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch {
      return next(new HttpError('Invalid token', 401));
    }
  
    let verifiedUser;
    try {
      verifiedUser = await User.findById(decoded.id);
    } catch {
      return next(new HttpError('Invalid token', 401));
    }
  
    req.verifiedUser = verifiedUser;
  
    next();
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});


// 
// TODO: veraltete funktion???
// 
// 
const userExists = (users, nickname, email) => {
    // Prüfen im Members Array auf Vorhandensein
    // Early return pattern (sobald wie möglich die Funktion verlassen)
  
    if (
      users.findIndex(
        (user) => user.nickname === nickname || user.email === email
      ) > -1
    ) {
      return true;
    }
  
    return false;
};
// 
// 
// 
// 


// Cloudinary functionality
const sendFileToCloudinary = async (image, folder) => {

    try {
      const response = await cloudinary.uploader.upload(image, {
        folder,
        overwrite: true,
        secure: true,
      });
  
       // delete local image
    deleteFile(image);
  
    return response;
    }
    catch(error) {
      console.error('Error uploading to cloudinary:', error);
  
      return error; //rethrow error upwards and propagate it upwards
    }
  
};

  const deleteFileInCloudinary = async (publicId) => {
    if(!publicId || publicId.length === 0) {
      return;
    }
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.log('cloudinary error', error);
    }
};

const deleteFile = (path) => {
    try{
    //   checking if files exists
    if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
    } catch (error) {
      // handle file deletion error
      console.error('error deleting file:', error);
      throw error;
    }
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      const extArray = file.mimetype.split("/");
      const extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + "-" + Date.now() + "." + extension);
    },
  });
  
  const limits = {
    fileSize: 1024 * 1024 * 5, // max 5 MB
  };
  
  const fileFilter = (req, file, callback) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/heic'
    ) {
      return callback(null, true);
    }
  
    callback(null, false);
  };
  
  //   creating Multer middleware
  const upload = multer({ storage, limits, fileFilter });



  const getGeolocation = async (address) => {

    // encodeURIComponent to sidestep possible unfimiliar characters
    const response = await axios('https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&q=' + encodeURIComponent(address));
  
    if(response.data.length === 0) {
      return {
        lon: 0,
        lat: 0,
      }; 
    }
  
    return {
      lon: response.data[0].lon,
      lat: response.data[0].lat,
    };
    
  };
  
  function getGeoDistances(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  };
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  };


  const getAge = (year, month, day) => {
    // Achtung: bei Javascript fangen Monate mit 0 an!
    const today = new Date();
    const birthDate = new Date(year, month, day);
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
      if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age -= 1;
      }
      return age;
  };

const generateTour = () => {
  // eingabe:
  // standort (city)
  // anzahl stationen (2-4)
  // array categories (0-3)

  // get all locations from city

  // loop with all values from category-array through categories-array of location objects to compare => vibe array

  // if no categories => randomize?

  // getDistance zw Standort & vibe array locations => sort by nearest locations

  // splice sorted array by anzahl stationen

  // push ergebnis in resultTours-array (array aus arrays mit location objects)

  // rinse & repeat für alle angegebenen categories für alternative touren
};


  export {
    getHash,
    userExists,
    transporter,
    checkPassword,
    getToken,
    checkToken,
    deleteFile,
    upload,
    sendFileToCloudinary,
    getGeolocation,
    deleteFileInCloudinary,
    getGeoDistances,
    deg2rad,
    getAge
  };