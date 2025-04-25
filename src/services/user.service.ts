
import { config } from "../config/config";
import { IResponse } from "../interfaces/common.interface";
import { ICreateUser, IUpdateUser } from "../interfaces/user.interface";
import userModel from "../models/user.model";
import { generateJwtToken } from "../utils/generate-token";
import HTTPException from "../utils/http-exception";
import bcrypt from "bcrypt";

class UserService {
    private readonly jwtSecret: string;
    constructor() {
        this.jwtSecret = config.jwtSecret;
    }

    public async registerUser(data: ICreateUser): Promise<IResponse> {
        try {
            console.log("📥 Incoming register payload:", data);

            const existingUser = await userModel.findOne({ email: data.email });
            if (existingUser) {
                throw HTTPException.conflict("User with this email already exists.");
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);

            const newUser = await userModel.create({
                username: data.username,
                email: data.email,
                password: hashedPassword,
            });
            const token = generateJwtToken({ id: newUser._id, email: newUser.email }, this.jwtSecret);
            return {
                status: "success",
                message: "User registered successfully",
                data: {
                    token,
                    user: {
                        id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                    },
                },
            };
        } catch (error) {
            if (error instanceof HTTPException) throw error;
            throw HTTPException.internalServerError("An error occurred while registering the user.");
        }
    }

    public async updateUserProfile(userId: string, updateData: IUpdateUser): Promise<IResponse> {
        try {
          const user = await userModel.findById(userId);
          if (!user) throw HTTPException.notFound("User not found");
    
          if (updateData.username) user.username = updateData.username;
          if (updateData.email) user.email = updateData.email;
          if (updateData.profileImage) user.profileImage = updateData.profileImage;
          if (updateData.gallery) user.gallery = updateData.gallery;
    
          await user.save();
    
          return {
            status: "success",
            message: "User profile updated successfully",
            data: {
              id: user._id,
              username: user.username,
              email: user.email,
              profileImage: user.profileImage,
              gallery: user.gallery,
            },
          };
        } catch (error) {
          if (error instanceof HTTPException) throw error;
          throw HTTPException.internalServerError("An error occurred while updating the profile.");
        }
      }
}

export const userService = new UserService();
