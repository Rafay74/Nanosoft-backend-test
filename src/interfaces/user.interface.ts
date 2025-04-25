import { Document, Types } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    profileImage?: string;
    gallery: Types.ObjectId[];
  }

export interface ICreateUser {
    username: string;
    email: string;
    password: string;
}

export interface IUpdateUser {
    username?: string;
    email?: string;
    profileImage?: string;
    gallery?: Types.ObjectId[];
  }