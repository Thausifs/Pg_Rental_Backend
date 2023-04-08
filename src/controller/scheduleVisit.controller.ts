import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import catchAsync from "../utils/catchAsync";
import { newScheduleVisitType } from "../validators/scheduleVisit.validator";
const prisma = new PrismaClient();

const scheduleVisit = catchAsync(
  async (
    req: Request<any, any, newScheduleVisitType>,
    res: Response,
    next: NextFunction
  ) => {
    const newScheDuleVisit = await prisma.schedule_Visit.create({
      data: req.body,
    });
    res.status(201).json({
      data: newScheDuleVisit,
    });
  }
);

export default {
  scheduleVisit,
};
