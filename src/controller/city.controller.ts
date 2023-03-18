import { Request, Response, NextFunction } from "express";
import City from "../models/city.model";

import catchAsync from "../utils/catchAsync";

const addCity = catchAsync(
  async (
    req: Request<any, any, { name: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;
    const newCity = await City.create({
      name: name,
      slug: name.toLowerCase().trim().split(" ").join("_"),
    });
    res.status(201).json({
      status: true,
      catagory: newCity,
    });
  }
);
const getAllCity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allCity = await City.find({});
    res.status(200).json({
      status: true,
      data: allCity,
    });
  }
);

export default {
  addCity,
  getAllCity,
};
