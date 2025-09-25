import express from 'express';
import { forgotPassword, getRegisteration, getUserInfo, loggedIn, logout, resetPassword } from '../controller/authControllers.js';
import authJWT from '../middleware/authJWT.js';
import upload from '../middleware/multerMiddleware.js';
import { changePassword } from '../controller/authControllers.js';
import { updateProfile } from '../controller/authControllers.js';
const authRouter = express.Router();

//Authentication routes
authRouter.post('/register',upload.single('avatar'), getRegisteration);
authRouter.post('/login',loggedIn);
authRouter.post('/logout',authJWT,logout);
authRouter.get('/me',authJWT,getUserInfo);
authRouter.post('/forgot-password',forgotPassword);
authRouter.post('/reset-password/:resetToken',resetPassword);
authRouter.post('/change-password',authJWT,changePassword);
authRouter.put('/update',authJWT,upload.single('avatar'),updateProfile)

export default authRouter;