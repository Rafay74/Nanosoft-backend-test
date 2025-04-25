import { Request, Response } from "express";
import HTTPException from "../utils/http-exception";
import { imageService } from "../services/image.service";

class ImageController {
  // public async uploadImage(req: Request, res: Response): Promise<void> {
  //   try {
  //     const userId = req.user?.id;
  //     if (!userId) {
  //       throw new HTTPException(400, "User ID is required");
  //     }
  //     const { url, isPublic } = req.body; 

  //     const result = await imageService.uploadImage(userId, { url, isPublic });
  //     res.status(201).json(result);
  //   } catch (error) {
  //     if (error instanceof HTTPException) {
  //       res.status(error.statusCode).json({ status: "error", message: error.message });
  //     } else {
  //       res.status(500).json({ status: "error", message: "An unknown error occurred" });
  //     }
  //   }
  // }

  public async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HTTPException(400, "User ID is required");
      }
  
      if (!req.file) {
        throw new HTTPException(400, "Image file is required");
      }
  
      const { title, description, visibility } = req.body;
      console.log({ title, description, visibility });
      const imagePath = req.file.path;
  
      if (!title) {
        throw new HTTPException(400, "Title is required");
      }
  
      const result = await imageService.uploadImage(userId, {
        title,
        description,
        url: imagePath, 
        isPublic: visibility === "public"
      });
  
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof HTTPException) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
      } else {
        console.error("🔥 Unexpected error in uploadImage:", error);
        res.status(500).json({ status: "error", message: "An unknown error occurred" });
      }
    }
  }
  

  public async getPublicImagesByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const result = await imageService.getPublicImagesByUser(userId);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof HTTPException) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
      } else {
        res.status(500).json({ status: "error", message: "An unknown error occurred" });
      }
    }
  }

  public async toggleImageVisibility(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const imageId = req.params.id;

      if (!userId) {
        throw new HTTPException(400, "User ID is required");
      }
      const result = await imageService.toggleImageVisibility(userId, imageId);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof HTTPException) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
      } else {
        res.status(500).json({ status: "error", message: "An unknown error occurred" });
      }
    }
  }

  public async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const imageId = req.params.id;

      if (!userId) {
        throw new HTTPException(400, "User ID is required");
      }
      const result = await imageService.deleteImage(userId, imageId);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof HTTPException) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
      } else {
        res.status(500).json({ status: "error", message: "An unknown error occurred" });
      }
    }
  }

  public async getMyGallery(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HTTPException(400, "User ID is required");
      }
      const result = await imageService.getMyGallery(userId);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof HTTPException) {
        res.status(error.statusCode).json({ status: "error", message: error.message });
      } else {
        res.status(500).json({ status: "error", message: "An unknown error occurred" });
      }
    }
  }
}

export const imageController = new ImageController();
