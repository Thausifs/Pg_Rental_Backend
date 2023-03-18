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
    const newListingData = await (await newListing.save()).populate("feature");

    res.status(201).json({
      status: true,
      data: newListingData,
    });
  }
);

export default {
  addNewListing,
};
