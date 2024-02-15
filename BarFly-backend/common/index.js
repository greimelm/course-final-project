import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import nodemailer from 'nodemailer';

import HttpError from "../models/http-errors.js";

import { User } from '../models/usersModel.js';

// configuration to access .env-file
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

  
    if (!authorization) {
      // status 401 unauthorized
      return next(new HttpError('Invalid token', 401));
    }

    // get token from headers
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

// configuration emailing service
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});


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
      console.error('cloudinary error', error);
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
  
  // maximum file size of 5 MB
  const limits = {
    fileSize: 1024 * 1024 * 5
  };
  
  // accepting these types of files
  const fileFilter = (req, file, callback) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif' 
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

  // TO BE developed for calculating distances between locations, users, etc
  
  // function getGeoDistances(lat1, lon1, lat2, lon2) {
  //   var R = 6371; // Radius of the earth in km
  //   var dLat = deg2rad(lat2-lat1);  // deg2rad below
  //   var dLon = deg2rad(lon2-lon1); 
  //   var a = 
  //     Math.sin(dLat/2) * Math.sin(dLat/2) +
  //     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
  //     Math.sin(dLon/2) * Math.sin(dLon/2)
  //     ; 
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  //   var d = R * c; // Distance in km
  //   return d;
  // };
  
  // function deg2rad(deg) {
  //   return deg * (Math.PI/180)
  // };


  // calculating age when signing up
  const getAge = (year, month, day) => {
  
    const today = new Date();
    const birthDate = new Date(year, month, day);
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
      if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age -= 1;
      }
      return age;
  };

  export {
    getHash,
    transporter,
    checkPassword,
    getToken,
    checkToken,
    deleteFile,
    upload,
    sendFileToCloudinary,
    getGeolocation,
    deleteFileInCloudinary,
    // getGeoDistances,
    // deg2rad,
    getAge
  };