import mongoose, { Schema } from "mongoose";
import { IImage } from "../interfaces/image.interface";

const ImageSchema = new Schema<IImage>(
  {
    title: { type: String, required: true },        
    description: { type: String, required: false }, 
    url: { type: String, required: true },          
    isPublic: { type: Boolean, default: true },     
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IImage>("Image", ImageSchema);
