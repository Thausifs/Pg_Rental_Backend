import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { addNewAvailabilityType } from "../validators/availability.validator";

const prisma = new PrismaClient();

const addNewAvailability = catchAsync(
  async (
    req: Request<any, any, addNewAvailabilityType>,
    res: Response,
    next: NextFunction
  ) => {
    const newAvailAbiltiy = await prisma.availAbility.create({
      data: req.body,
    });

    res.status(201).json({
      status: true,
      data: newAvailAbiltiy,
    });
  }
);
const getAllAvailability = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const getAllAvailabilities = await prisma.availAbility.findMany();
    res.status(200).json({
      status: true,
      data: getAllAvailabilities,
    });
  }
);

export default {
  addNewAvailability,
  getAllAvailability,
};
