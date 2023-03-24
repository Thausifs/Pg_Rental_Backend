import { Request, Response, NextFunction } from "express";
import ResidentDetailModel from "../models/residenceDetail.model";

import catchAsync from "../utils/catchAsync";
import { multerFiledType } from "../utils/Types/multer.types";
import { addListingType } from "../validators/listing.validator";

const addNewListing = catchAsync(
  async (
    req: Request<any, any, addListingType>,
    res: Response,
    next: NextFunction
  ) => {
    const files = req.files as multerFiledType;

    const newListing = new ResidentDetailModel({ ...req.body });
    const roomPhotos = files["roomPhotos"];
    if (roomPhotos) {
      roomPhotos.forEach((ele) => {
        newListing.roomPhotos.push(ele.path);
      });
    }
    const dinningAreaPhotos = files["dinningAreaPhotos"];
    if (dinningAreaPhotos) {
      dinningAreaPhotos.forEach((ele) => {
        newListing.dinningAreaPhotos.push(ele.path);
      });
    }
    const commonAreaPhotos = files["commonAreaPhotos"];
    if (commonAreaPhotos) {
      commonAreaPhotos.forEach((ele) => {
        newListing.commonAreaPhotos.push(ele.path);
      });
    }
    const coverImages = files["coverImage"];
    if (coverImages) {
      coverImages.forEach((ele) => {
        newListing.coverImage.push(ele.path);
      });
    }
    const newListingData = await newListing.save();

    res.status(201).json({
      status: true,
      data: newListingData,
    });
  }
);
const getAllListing = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allListing = await ResidentDetailModel.find({});
    res.status(200).json({
      status: true,
      data: allListing,
    });
  }
);
export default {
  addNewListing,
  getAllListing,
};
