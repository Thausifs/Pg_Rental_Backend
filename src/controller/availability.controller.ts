import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import {
  addNewAvailabilityType,
  editAvailabilityType,
} from "../validators/availability.validator";
import AppError from "../utils/AppError";
import { createPlan } from "../service/Payment/razorpay.service";

const prisma = new PrismaClient();

const addNewAvailability = catchAsync(
  async (
    req: Request<any, any, addNewAvailabilityType>,
    res: Response,
    next: NextFunction
  ) => {
    const newAvailAbiltiy = await prisma.availAbility.create({
      data: req.body,
      include: {
        roomType: true,
      },
    });
    const newPlan = await createPlan({
      name: newAvailAbiltiy.roomType.typeOfRoom,
      description: newAvailAbiltiy.roomType.typeOfRoom,
      amount: newAvailAbiltiy.price,
    });
    const updatedAvailability = await prisma.availAbility.updateMany({
      where: {
        uid: newAvailAbiltiy.uid,
      },
      data: {
        planIdRazorpay: newPlan,
      },
    });
    res.status(201).json({
      status: true,
      data: updatedAvailability,
    });
  }
);
const editAvailability = catchAsync(
  async (
    req: Request<{ id: string }, any, editAvailabilityType>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const findAvailability = await prisma.availAbility.findFirst({
      where: {
        uid: id,
      },
      include: {
        roomType: true,
      },
    });
    if (!findAvailability) {
      return next(new AppError("Availability Not Fount", 404));
    }
    if (req.body.price) {
      const newPlan = await createPlan({
        name: findAvailability.roomType.typeOfRoom,
        description: findAvailability.roomType.typeOfRoom,
        amount: req.body.price,
      });
      await prisma.availAbility.update({
        where: {
          uid: id,
        },
        data: {...req.body,planIdRazorpay:newPlan},
      });
    } else {
      await prisma.availAbility.update({
        where: {
          uid: id,
        },
        data: req.body,
      });
    }
    res.sendStatus(200);
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
  editAvailability,
};
