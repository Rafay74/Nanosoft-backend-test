import express from 'express';
import { userController } from '../controllers/user.controller';
import { isAuthenticated } from '~/middlewares/auth.middleware';


const authRoutes = express.Router();
authRoutes.post("/register", userController.register);
authRoutes.put("/profile", isAuthenticated, userController.updateProfile); 


export default authRoutes