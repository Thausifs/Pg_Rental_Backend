import { Request, Response, NextFunction } from "express";

import roomTypeModel from "../models/roomType.model";
import catchAsync from "../utils/catchAsync";

const addCatagory = catchAsync(
  async (
    req: Request<any, any, { name: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;
    const newCatagory = await roomTypeModel.create({
      typeOfRoom: name,
      slug: name.toLowerCase().trim().split(" ").join("_"),
    });
    res.status(201).json({
      status: true,
      catagory: newCatagory,
    });
  }
);
const getAllCatagory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllRoomTypes = await roomTypeModel.find({});
    res.status(200).json({
      status: true,
      data: getAllRoomTypes,
    });
  }
);

export default {
  addCatagory,
  getAllCatagory,
};
