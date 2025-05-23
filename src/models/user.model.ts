import mongoose, { Schema} from "mongoose";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>({
    username: { type: String , required: true},
    email: { type: String , required: true , unique: true},
    password: { type: String , required: true},
    profileImage: { type: String},
    gallery: [ { type: Schema.Types.ObjectId , ref: 'Image'} ]
} , { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);