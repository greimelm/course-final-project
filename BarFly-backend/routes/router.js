import { Router } from "express";
import { body } from "express-validator";

import { checkToken, upload } from "../common/index.js";

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
  locationSignup
} from '../controllers/locationsController.js';

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

router.post(
  '/locations/signup',
  upload.single("photo"),
  [
    body("name").trim().toLowerCase().isLength({ min: 4, max: 50 }),
    body("email").toLowerCase().normalizeEmail().isEmail(),
    body("locationPassword").trim().isLength({ min: 6, max: 50 }),
    body("street").trim().isLength({ min: 3, max: 50 }),
    body("zip").trim().isLength({ min: 4, max: 50 }),
    body("city").trim().isLength({ min: 2, max: 50 }),
    body("birthDay").isInt({ min: 1, max: 31 }),
    body("birthMonth").isInt({ min: 1, max: 12 }),
    body("birthYear").isInt({ min: 1, max: new Date().getFullYear() }),
    body('smallDescription').isLength({ min: 1, max: 200 }),
    body('detailedDescription').isLength({ min: 1, max: 1000 })
  ],
  locationSignup
);

// tour routes
// favourite locations routes
// favourite tours routes

export default router;
