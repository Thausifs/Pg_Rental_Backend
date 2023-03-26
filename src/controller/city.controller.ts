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

export default {
  addCity,
  getAllCity,
};
