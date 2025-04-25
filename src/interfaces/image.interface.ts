import { Document, Types } from "mongoose";

export interface IImage extends Document {
  title: string;
  description?: string;
  url: string; // or path if renamed
  isPublic: boolean;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUploadImage {
  title: string;
  description?: string;
  url: string;
  isPublic?: boolean;
}
