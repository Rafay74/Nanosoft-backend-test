import ImageModel from "../models/image.model";
import UserModel from "../models/user.model";
import HTTPException from "../utils/http-exception";
import { IResponse } from "../interfaces/common.interface";
import { IUploadImage } from "../interfaces/image.interface";

class ImageService {
  public async uploadImage(userId: string, data: IUploadImage): Promise<IResponse> {
    if (!data.url) throw HTTPException.badRequest("Image URL is required");
    if (!data.title) throw HTTPException.badRequest("Image title is required");

    const image = await ImageModel.create({
      title: data.title,                 
      description: data.description,     
      url: data.url,
      isPublic: data.isPublic ?? true,
      user: userId,
    });

    await UserModel.findByIdAndUpdate(userId, { $push: { gallery: image._id } });

    return {
      status: "success",
      message: "Image uploaded successfully",
      data: image,
    };
  }

  public async getPublicImagesByUser(userId: string): Promise<IResponse> {
    const user = await UserModel.findById(userId).populate({
      path: "gallery",
      match: { isPublic: true },
    });

    if (!user) throw HTTPException.notFound("User not found");

    return {
      status: "success",
      message: "Public images fetched",
      data: user.gallery,
    };
  }

  public async getMyGallery(userId: string): Promise<IResponse> {
    const images = await ImageModel.find({ user: userId });

    return {
      status: "success",
      message: "Gallery fetched successfully",
      data: images,
    };
  }

  public async toggleImageVisibility(userId: string, imageId: string): Promise<IResponse> {
    const image = await ImageModel.findOne({ _id: imageId, user: userId });

    if (!image) throw HTTPException.notFound("Image not found or access denied");

    image.isPublic = !image.isPublic;
    await image.save();

    return {
      status: "success",
      message: `Image marked as ${image.isPublic ? "public" : "private"}`,
      data: image,
    };
  }

  public async deleteImage(userId: string, imageId: string): Promise<IResponse> {
    const image = await ImageModel.findOneAndDelete({ _id: imageId, user: userId });
    if (!image) throw HTTPException.notFound("Image not found or access denied");

    await UserModel.findByIdAndUpdate(userId, { $pull: { gallery: image._id } });

    return {
      status: "success",
      message: "Image deleted successfully",
      data: { deletedId: imageId },
    };
  }
}

export const imageService = new ImageService();
