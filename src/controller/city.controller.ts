import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import catchAsync from "../utils/catchAsync";

const prisma = new PrismaClient();

const addCity = catchAsync(
  async (
    req: Request<any, any, { name: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;
    const newCity = await prisma.city.create({
      data: {
        name: name,
        slug: name.toLowerCase().trim().split(" ").join("_"),
      },
    });
    res.status(201).json({
      status: true,
      catagory: newCity,
    });
  }
);
const getAllCity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allCity = await prisma.city.findMany();
    res.status(200).json({
      status: true,
      data: allCity,
    });
  }
);
const deleteCityById = catchAsync(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const city = await prisma.city.findFirst({ where: { id: req.params.id } });
    if (!city) {
      res.status(400).json({
        message: "City Doesnot exist",
      });
    }
    await prisma.city.deleteMany({
      where: { id: req.params.id,},
    });
    res.sendStatus(200);
  }
);

export default {
  addCity,
  getAllCity,
  deleteCityById,
};
