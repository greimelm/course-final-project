import { User } from '../models/usersModel.js';

const createFavouriteLocation = async (req, res, next) => {

  const { userId, locationId } = req.params;

   // look for user
  let user;
  let savedUser;

  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError('Cant find user', 404));
    }

    if (user.favorites.includes(locationId)) {
      return next(new HttpError('Favourite locations must be unique', 409));
    }

    user.favouriteLocations.push(locationId);
    savedUser = await user.save();
    savedUser = await User.findById(userId).populate('favouriteLocations');
  } catch (error) {
    console.log(error);
    return next(new HttpError('Cant find user', 404));
  }

  res.json(savedUser);
};

const deleteFavouriteLocation = async (req, res, next) => {
  const { userId, locationId } = req.params;

  
  let user;
  let savedUser;

  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError('Cant find user', 404));
    }

    user.favouriteLocations.pull(locationId);
    savedUser = await user.save();
    savedUser = await User.findById(userId).populate('favouriteLocations');
  } catch (error) {
    console.log(error);
    return next(new HttpError('Cant find user', 404));
  }

 
  res.json(savedUser);
};

const createFavouriteTour = async (req, res, next) => {
  
  const { userId, tourId } = req.params;

  let user;
  let savedUser;

  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError('Cant find user', 404));
    }

    if (user.favouriteTours.includes(tourId)) {
      return next(new HttpError('Favourite tours must be unique', 409));
    }

    user.favouriteTours.push(tourId);
    savedUser = await user.save();
    savedUser = await User.findById(userId).populate('favouriteTours');
  } catch (error) {
    console.log(error);
    return next(new HttpError('Cant find user', 404));
  }

  res.json(savedUser);
};

const deleteFavouriteTour = async (req, res, next) => {
  const { userId, tourId } = req.params;

  let user;
  let savedUser;

  try {
    user = await User.findById(userId);
    if (!user) {
      return next(new HttpError('Cant find user', 404));
    }

    user.favouriteTours.pull(tourId);
    savedUser = await user.save();
    savedUser = await User.findById(userId).populate('favouriteTours');
  } catch (error) {
    console.log(error);
    return next(new HttpError('Cant find user', 404));
  }

  
  res.json(savedUser);
};

export { createFavouriteLocation, deleteFavouriteLocation, createFavouriteTour, deleteFavouriteTour };