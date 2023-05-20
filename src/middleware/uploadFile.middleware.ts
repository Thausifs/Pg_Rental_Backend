import multer, { Multer } from "multer";

import cloudnary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v4 } from "uuid";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import config from 'config'

const CLOUDNARY_CLOUD_NAME=config.get<string>("CLOUDNARY_CLOUD_NAME")
const CLOUDNARY_API_KEY=config.get<string>("CLOUDNARY_API_KEY")
const CLOUDNARY_API_SECRET=config.get<string>("CLOUDNARY_API_SECRET")

cloudnary.v2.config({
  cloud_name:CLOUDNARY_CLOUD_NAME,
  api_key: CLOUDNARY_API_KEY,
  api_secret: CLOUDNARY_API_SECRET,
});
const configCloudnaryStorage = new CloudinaryStorage({
  cloudinary: cloudnary.v2,
  params: {
    public_id: (req, file) => v4(),
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(__dirname);
    cb(null, `${__dirname}/../../public/img`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const multerUpload = function (): Multer {
  return multer({
    storage: configCloudnaryStorage,
    limits: {
      fileSize: 200 * 1024 * 1024, // no larger than 200mb
    },
  });
};
export const imageUpload = function (): Multer {
  return multer({
    storage: configCloudnaryStorage,
    limits: {
      fileSize: 200 * 1024 * 1024, // no larger than 200mb
    },
    fileFilter: imageFilter,
  });
};
type multerField = {
  name: string;
  maxCount?: number;
};

export const fileUploadMiddleware = (fiels: multerField[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const upload = multerUpload().fields(fiels);
    return upload(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
    next();
  });

function imageFilter(req: any, file: any, cb: any) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload an image.", 400), false);
  }
}
