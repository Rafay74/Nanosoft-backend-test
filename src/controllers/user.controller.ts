import { Request, Response } from "express";
import { ICreateUser, IUpdateUser } from "../interfaces/user.interface";
import HTTPException from "../utils/http-exception";
import { userService } from "../services/user.service";

class UserController {
  public async register(req: Request, res: Response): Promise<void> {
    try {

      const userData: ICreateUser = req.body;
      const result = await userService.registerUser(userData);

      res.status(201).json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      if (error instanceof HTTPException) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
      } else {
        res.status(500).json({ status: "error", message: "An unknown error occurred" });
      }
    }
  }

  public async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const updateData: IUpdateUser = req.body;
      const result = await userService.updateUserProfile(userId, updateData);

      res.status(200).json({
        status: result.status,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      if (error instanceof HTTPException) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
      } else {
        res.status(500).json({ status: "error", message: "An unknown error occurred" });
      }
    }
  }
}

export const userController = new UserController();
