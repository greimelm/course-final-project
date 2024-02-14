import { Router } from "express";
import { body } from "express-validator";

import { checkToken, upload } from "../common/index.js";
// 
// double check & richtig dokumentieren
// 

import {
  getAllUsers,
  getOneUser,
  signup,
  login,
  unlock,
  editUser,
  deleteUser
} from "../controllers/usersController.js";

import {
  getAllLocations,
  getOneLocation,
  locationSignup,
  editLocation,
  deleteLocation,
  getMyLocations
} from '../controllers/locationsController.js';

import {
  createTour,
  getAllTours,
  getOneTour,
  editTour,
  deleteTour,
  generateTour
} from "../controllers/toursController.js";

import {
  createFavouriteLocation,
  deleteFavouriteLocation,
  createFavouriteTour,
  deleteFavouriteTour
} from '../controllers/favouritesController.js';

const router = new Router();


// user routes

router.get("/users", getAllUsers);
router.get("/users/:id", getOneUser);

router.post(
  "/users/signup",
  upload.single("photo"),
  [
    body("nickname").trim().toLowerCase().isLength({ min: 4, max: 50 }),
    body("email").toLowerCase().normalizeEmail().isEmail(),
    body("password").trim().isLength({ min: 6, max: 50 }),
    body("firstName").trim().isLength({ min: 2, max: 50 }),
    body("lastName").trim().isLength({ min: 2, max: 50 }),
    body("street").trim().isLength({ min: 3, max: 50 }),
    body("zip").trim().isLength({ min: 4, max: 50 }),
    body("city").trim().isLength({ min: 2, max: 50 }),
    body("birthDay").isInt({ min: 1, max: 31 }),
    body("birthMonth").isInt({ min: 1, max: 12 }),
    body("birthYear").isInt({ min: 1, max: new Date().getFullYear() })
  ],

  signup
);

router.post("/users/unlock", unlock);

router.post("/users/login", login);

router.patch(
  "/users/edit/:id",
  checkToken,
  upload.single("photo"),
  [
    body("firstName").trim().isLength({ min: 2, max: 50 }).optional(),
    body("lastName").trim().isLength({ min: 2, max: 50 }).optional(),
    body("street").trim().isLength({ min: 3, max: 50 }).optional(),
    body("zip").trim().isLength({ min: 4, max: 50 }).optional(),
    body("city").trim().isLength({ min: 2, max: 50 }).optional(),
    body("birthDay").isInt({ min: 1, max: 31 }).optional(),
    body("birthMonth").isInt({ min: 1, max: 12 }).optional(),
    body("birthYear").isInt({ min: 1, max: new Date().getFullYear() }).optional()
  ],
  editUser
);

router.patch('/users/change-password',
  checkToken,
  [
    body('oldPassword').trim().isLength({ min: 6, max: 50 }),
    body('newPassword').trim().isLength({ min: 6, max: 50 })
  ]
)

router.delete('/users/:id', checkToken, deleteUser);


// locations routes

router.get('/locations', getAllLocations);
router.get('/locations/:id', getOneLocation);

router.get('/mylocations/:id', getMyLocations);

router.post(
  '/locations/signup',
  upload.single("photo"),
  [
    body("name").trim().isLength({ min: 4, max: 50 }),
    body("email").toLowerCase().normalizeEmail().isEmail(),
    body("street").trim().isLength({ min: 3, max: 50 }),
    body("zip").trim().isLength({ min: 4, max: 50 }),
    body("city").trim().isLength({ min: 2, max: 50 }),
    body('smallDescription').isLength({ min: 1, max: 500 }),
    body('detailedDescription').isLength({ min: 1, max: 10000 })
  ],
  locationSignup
);

router.patch(
  "/locations/edit/:id",
  checkToken,
  upload.single("photo"),
  [
    body("name").trim().isLength({ min: 2, max: 50 }).optional(),
    body("email").toLowerCase().normalizeEmail().isEmail().optional(),
    body("street").trim().isLength({ min: 3, max: 50 }).optional(),
    body("zip").trim().isLength({ min: 4, max: 50 }).optional(),
    body("city").trim().isLength({ min: 2, max: 50 }).optional(),
    body('smallDescription').isLength({ min: 1, max: 200 }).optional(),
    body('detailedDescription').isLength({ min: 1, max: 1000 }).optional()
  ],
  editLocation
);

router.delete('/locations/:id', checkToken, deleteLocation);


// tour routes

router.get('/tours', getAllTours);
router.get('/tours/:id', getOneTour);

router.get('/generate-tour', generateTour);

router.post(
  '/tours/create/:id',
  upload.single("photo"),
  [
    body('name').trim().toLowerCase().isLength({ min: 4, max: 50 }),
    body('smallDescription').isLength({ min: 1, max: 200 }).optional()
  ],
  createTour
);

router.patch(
  "/tours/edit/:id",
  checkToken,
  upload.single("photo"),
  [
    body('name').trim().isLength({ min: 2, max: 50 }).optional(),
    body('smallDescription').isLength({ min: 1, max: 200 }).optional(),
  ],
  editTour
);

router.delete('/tours/:id', checkToken, deleteTour);


// favourite locations routes

router.post('/favlocations/:id/:locationId', checkToken, createFavouriteLocation);

router.delete('/favlocations/:id/:locationId', checkToken, deleteFavouriteLocation);

// favourite tours routes

router.post('/favtours/:id/:tourId', checkToken, createFavouriteTour);

router.delete('/favtours/:id/:tourId', checkToken, deleteFavouriteTour);

export default router;