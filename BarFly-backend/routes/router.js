import { Router } from 'express';
import { body } from 'express-validator';

import { checkToken, upload } from '../common/index.js';

import { 
    getAllUsers,
    getOneUser,
    signup,
    login
} from '../controllers/usersController.js';

const router = new Router();

// user routes
router.get('/users', getAllUsers);
router.get('/users/:id', getOneUser);

router.post(
    '/users/signup',
    upload.single('photo'),
    [
      body('nickname').trim().toLowerCase().isLength({min: 4, max: 50}),
      body('email').toLowerCase().normalizeEmail().isEmail(),
      body('password').trim().isLength({ min: 6, max: 50}),
      body('firstName').trim().isLength({ min: 2, max:50 }),
      body('lastName').trim().isLength({ min: 2, max:50 }),
      body('street').trim().isLength({ min: 3, max:50 }),
      body('zip').trim().isLength({ min: 4, max:50 }),
      body('city').trim().isLength({ min: 2, max:50 }),
      body('birthDay').isInt({ min: 1, max: 31 }),
      body('birthMonth').isInt({ min: 1, max: 12 }),
      body('birthYear').isInt({ min: 1, max: new Date().getFullYear() })
    ],
  
    signup
);

router.post('/users/login', login);

// bar routes

// router.post(
//   '/users/locations/signup'
// )
// tour routes
// favourite routes

export default router;