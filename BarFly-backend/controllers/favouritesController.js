import { FavouriteLocation } from "../models/favouriteLocationModel.js";
import { FavouriteTour } from "../models/favouriteTourModel.js";
import { User } from "../models/usersModel.js";

import HttpError from "../models/http-errors.js";

// 
// TODO richtig dokumentieren
// 

const createFavouriteLocation = async (req, res, next) => {
    const { userId, locationId } = req.params;

    
  
    // User suchen
    let user;
    let savedUser;

    // dynamisch array auswählen
      // 
    // tenary operator array bestimmen
    const array = 'favouriteLocations';
  
    try {
        user = await User.findById(userId);
      if (!user) {
        return next(new HttpError('Cant find user', 404));
      }
      
  
      if (user[array].includes(locationId)) {
        return next(new HttpError('Favourite list must be unique', 409));
      }
      
      user[array].push(locationId);
      savedUser = await User.save();
      savedUser = await User.findById(userId).populate(array);
    } catch (error) {
      console.log(error);
      return next(new HttpError('Cant find user', 404));
    }
  
    res.json(savedUser);
};




const getAllFavLocations = async (req, res) => {
  const favLocations = await FavouriteLocation.find({});
  res.json(favLocations);
};

const getOneFavLocation = async (req, res, next) => {
  let favLocation;

  try {
    favLocation = await FavouriteLocation.findById(req.params.id);
  } catch (error) {
    return next(new HttpError("Cant find location", 404));
  }

  res.json(favLocation);
};

const deleteFavouriteLocation = async (req, res, next) => {
    const { userId, locationId } = req.params;
  
    // User suchen
    let user;
    let savedUser;
  
    try {
        user = await User.findById(userId);
      if (!user) {
        return next(new HttpError('Cant find user', 404));
      }
  
      user.favouriteLocations.pull(locationId);
      savedUser = await User.save();
      savedUser = await User.findById(userId).populate('favouriteLocations');
    } catch (error) {
      console.log(error);
      return next(new HttpError('Cant find user', 404));
    }
  
    // Erfolgsmeldung
    res.json(savedUser);
};


const createFavouriteTour = async (req, res, next) => {
    const { userId, tourId } = req.params;
  
    // User suchen
    let user;
    let savedUser;
  
    try {
        user = await User.findById(userId);
      if (!user) {
        return next(new HttpError('Cant find user', 404));
      }
  
      if (user.favouriteTours.includes(tourId)) {
        return next(new HttpError('Favourite list must be unique', 409));
      }
  
      user.favouriteTours.push(tourId);
      savedUser = await User.save();
      savedUser = await User.findById(userId).populate('favouriteTours');
    } catch (error) {
      console.log(error);
      return next(new HttpError('Cant find user', 404));
    }
  
    res.json(savedUser);
};




const getAllFavTours = async (req, res) => {
  const favTours = await FavouriteTour.find({});
  res.json(favTours);
};

const getOneFavTour = async (req, res, next) => {
  let favTour;

  try {
    favTour = await FavouriteTour.findById(req.params.id);
  } catch (error) {
    return next(new HttpError("Cant find tour", 404));
  }

  res.json(favTour);
};

const deleteFavouriteTour = async (req, res, next) => {
    const { userId, tourId } = req.params;
  
    // User suchen
    let user;
    let savedUser;
  
    try {
        user = await User.findById(userId);
      if (!user) {
        return next(new HttpError('Cant find user', 404));
      }
  
      user.favouriteTours.pull(tourId);
      savedUser = await User.save();
      savedUser = await User.findById(userId).populate('favouriteTours');
    } catch (error) {
      console.log(error);
      return next(new HttpError('Cant find user', 404));
    }
  
    // Erfolgsmeldung
    res.json(savedUser);
};


export { createFavouriteLocation, deleteFavouriteLocation, getOneFavLocation, getAllFavLocations, createFavouriteTour, deleteFavouriteTour, getAllFavTours, getOneFavTour };