import express from 'express';
import { userController } from '../controllers/user.controller';


const authRoutes = express.Router();
authRoutes.post("/register", userController.register);


export default authRoutes