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
    const getAllRoomTypes = await prisma.roomType.findMany();
    res.status(200).json({
      status: true,
      data: getAllRoomTypes,
    });
  }
);
const deleteRoomTypeById = catchAsync(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const roomType = await prisma.roomType.findFirst({
      where: { id: req.params.id },
    });
    if (!roomType) {
      res.status(400).json({
        message: "roomType Doesnot exist",
      });
    }
    
    await prisma.roomType.delete({
      where: { slug: roomType?.slug },
    });
    res.sendStatus(200);
  }
);

export default {
  addCatagory,
  getAllCatagory,
  deleteRoomTypeById,
};
