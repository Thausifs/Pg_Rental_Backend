import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";

import catchAsync from "../utils/catchAsync";
import {
  newScheduleVisitType,
  updateScheduleVisitType,
} from "../validators/scheduleVisit.validator";
import AppError from "../utils/AppError";
const prisma = new PrismaClient();

const scheduleVisit = catchAsync(
  async (
    req: Request<any, any, newScheduleVisitType>,
    res: Response,
    next: NextFunction
  ) => {
    const { phoneNo } = req.body;
    const getScheduleVisit = await prisma.schedule_Visit.findFirst({
      where: {
        AND: {
          phoneNo,
          completionState: "scheduled",
        },
      },
    });
    if (getScheduleVisit) {
      return next(new AppError("You are already scheduled a visit", 400));
    }
    const newScheDuleVisit = await prisma.schedule_Visit.create({
      data: {
        ...req.body,
        date: new Date(req.body.date).toISOString(),
      },
    });
    res.status(201).json({
      data: newScheDuleVisit,
    });
  }
);
const getAllScheduleVisit = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allVisits = await prisma.schedule_Visit.findMany({
      include: {
        resident: true,
      },
    });
    res.status(200).json({
      data: allVisits,
    });
  }
);
const deleteScheduleVisit = catchAsync(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    await prisma.schedule_Visit.delete({
      where: {
        uid: req.params.id,
      },
    });
    res.send(StatusCodes.OK);
  }
);
const editScheduleVisit = catchAsync(
  async (
    req: Request<{ id: string }, any, updateScheduleVisitType>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const updatedSchedule = await prisma.schedule_Visit.update({
      data: {
        ...req.body,
      },
      where: {
        uid: id,
      },
    });
    res.status(201).json({
      data: updatedSchedule,
    });
  }
);

export default {
  scheduleVisit,
  getAllScheduleVisit,
  editScheduleVisit,
  deleteScheduleVisit,
};
