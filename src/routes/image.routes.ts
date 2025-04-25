import express from 'express';
import { imageController } from './../controllers/image.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { uploadMiddleware } from '../middlewares/multer.middleware';

const imageRoutes = express.Router();

imageRoutes.post("/upload", isAuthenticated,   uploadMiddleware.single("image"),  imageController.uploadImage);
imageRoutes.get("/public/:userId", imageController.getPublicImagesByUser);
imageRoutes.put("/:id/visibility", isAuthenticated, imageController.toggleImageVisibility);
imageRoutes.delete("/:id", isAuthenticated, imageController.deleteImage);
imageRoutes.get("/my-gallery", isAuthenticated, imageController.getMyGallery);

export default imageRoutes