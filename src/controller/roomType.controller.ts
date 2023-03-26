import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import catchAsync from "../utils/catchAsync";

const prisma = new PrismaClient();

const addCatagory = catchAsync(
  async (
    req: Request<any, any, { name: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;
    const newCatagory = await prisma.roomType.create({
      data: {
        typeOfRoom: name,
        slug: name.toLowerCase().trim().split(" ").join("_"),
      },
    });
    res.status(201).json({
      status: true,
      catagory: newCatagory,
    });
  }
);
const getAllCatagory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const getAllRoomTypes = await roomTypeModel.find({});
    const getAllRoomTypes = await prisma.roomType.findMany();
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
