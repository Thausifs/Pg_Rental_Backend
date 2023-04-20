import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";

import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import {
  adddAdvanceBookingType,
  payemntSuccessBodyType,
} from "../validators/advanceBooking.validator";
import {
  createOrderRazerPay,
  fetchDetailByOrderId,
  validateSignature,
} from "../service/Payment/razorpay.service";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { update } from "lodash";
const prisma = new PrismaClient();

const addNewAdvanceBooking = catchAsync(
  async (
    req: Request<any, any, adddAdvanceBookingType>,
    res: Response,
    next: NextFunction
  ) => {
    const { phoneNo, residentId, roomTypeName, date, user_name } = req.body;
    const hasAdanceBooking = await prisma.advanceBooking.findFirst({
      where: {
        AND: {
          phoneNo,
        },
      },
    });
    if (hasAdanceBooking?.isPaymentSuccess) {
      return next(
        new AppError("You are have an adance booking you can book another", 400)
      );
    } else if (hasAdanceBooking) {
      const orderDetils = await fetchDetailByOrderId(
        hasAdanceBooking.razorpayOrderId
      );
      return res.status(200).json({
        data: orderDetils,
        advanceBookingId: hasAdanceBooking.uid,
      });
    }

    const newOrder = await createOrderRazerPay(
      2000,
      `Advance booking for ${user_name}`
    );

    const newAdvanceBooking = await prisma.advanceBooking.create({
      data: {
        residentId,
        phoneNo,
        user_name,
        roomTypeName,
        date: new Date(date).toISOString(),
        razorpayOrderId: newOrder.id,
      },
    });
    res.status(201).json({
      data: newOrder,
      advanceBookingId: newAdvanceBooking.uid,
    });
  }
);
const makeAdvanceBookingPaymentSuccess = catchAsync(
  async (
    req: Request<{ id: string }, any, payemntSuccessBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { razorpay_order_id, razorpay_signature, razorpay_payment_id } =
      req.body;
    const advanceBooking = await prisma.advanceBooking.findFirst({
      where: {
        uid: id,
      },
    });
    if (!advanceBooking) {
      return next(new AppError("No don't have any advanceBooking", 400));
    }
    //*Validate the razorpay signature
    if (
      validateSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      )
    ) {
      const updated = await prisma.advanceBooking.update({
        where: {
          uid: id,
        },
        data: {
          razorpay_payment_id: razorpay_payment_id,
          isPaymentSuccess: true,
        },
      });
      res.status(200).json({
        data: updated,
      });
    }
    return next(new AppError("Invaid payment id", 400));
  }
);
const getAllAdanceBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allAdanceBooking = await prisma.advanceBooking.findMany({
      include: {
        resident: true,
      },
    });
    res.status(200).json({
      data: allAdanceBooking,
    });
  }
);

export default {
  addNewAdvanceBooking,
  getAllAdanceBooking,
  makeAdvanceBookingPaymentSuccess,
};
