import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import AppError from "../utils/AppError";

import catchAsync from "../utils/catchAsync";
import { multerFiledType } from "../utils/Types/multer.types";

const prisma = new PrismaClient();

const addFeature = catchAsync(
  async (
    req: Request<any, any, { feature_name: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const files = req.files as multerFiledType;
    const featureImage = files["feature_image"];
    if (!featureImage || featureImage?.length === 0) {
      return next(new AppError("Feature logo is required", 400));
    }
    const featureLogo = await prisma.featureImage.create({
      data: featureImage[0],
    });
    const newFeature = await prisma.feature.create({
      data: {
        feature_name: req.body.feature_name,
        feature_image_id: featureLogo.id,
        slug: req.body.feature_name.toLowerCase().split(" ").join("_"),
      },
    });
    res.status(201).json({
      status: "success",
      data: newFeature,
    });
  }
);
const getAllFeature = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllFeature = await prisma.feature.findMany();
    res.status(200).json({
      status: true,
      data: getAllFeature,
    });
  }
);
const deleteFeatureById = catchAsync(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const feature = await prisma.feature.findFirst({
      where: { id: req.params.id },
    });
    if (!feature) {
      res.status(400).json({
        message: "roomType Doesnot exist",
      });
    }

    await prisma.feature.delete({
      where: { id: feature?.id },
    });
    res.sendStatus(200);
  }
);

export default {
  addFeature,
  getAllFeature,
  deleteFeatureById,
};
