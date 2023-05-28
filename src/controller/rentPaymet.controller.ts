import { NextFunction, Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";

import catchAsync from "../utils/catchAsync";
import {
  addNewRentPaymentType,
  payemntSucessSubcriptionBodyType,
} from "../validators/rentPaymentValidator";
import AppError from "../utils/AppError";
import {
  createNewSubcription,
  validateSignatureSubcription,
} from "../service/Payment/razorpay.service";

const prisma = new PrismaClient();

const addNewRentPayment = catchAsync(
  async (
    req: Request<{ listingId: string }, any, addNewRentPaymentType>,
    res: Response,
    next: NextFunction
  ) => {
    const { availabilityId, userId } = req.body;
    const findAvailability = await prisma.availAbility.findFirst({
      where: {
        uid: availabilityId,
      },
      include: {
        roomType: true,
      },
    });
    const findUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!findAvailability) {
      return next(new AppError("No availability found", 400));
    }
    if (!findUser) {
      return next(new AppError("User not found", 400));
    }

    const oldSubcription = await prisma.rentPaymentSubcriptin.findFirst({
      where: {
        userId: findUser.id,
        status: {
          not: "CANCEL",
        },
      },
    });
    if (oldSubcription) {
      return next(
        new AppError(
          "Threre is a sucription already exist for this user phone No: " +
            findUser.phoneNo +
            "",
          400
        )
      );
    }

    const phoneNo = findUser.phoneNo;

    const newSubcription = await createNewSubcription({
      planId: findAvailability.planIdRazorpay as string,
      phoneNo,
    });
    const newRentPayment = await prisma.rentPaymentSubcriptin.create({
      data: {
        subcriptionId: newSubcription,
        availabilityId,
        planId: findAvailability.planIdRazorpay as string,
        userId,
        roomNo: req.body.roomNo,
      },
    });
    await prisma.availAbility.update({
      where: {
        uid: findAvailability.uid,
      },
      data: {
        numberOfOccupancies: findAvailability.numberOfOccupancies - 1,
      },
    });

    res.status(201).json({
      status: true,
      data: newRentPayment,
    });
  }
);

const editRentPaymentById = catchAsync(
  async (
    req: Request<{ id: string }, any, payemntSucessSubcriptionBodyType>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const isValid = validateSignatureSubcription(
      razorpay_subscription_id,
      razorpay_payment_id,
      razorpay_signature
    );
    if (!isValid) {
      return next(new AppError("Payment Signature is invalid", 400));
    }
    const updatedrentPayment = await prisma.rentPaymentSubcriptin.update({
      where: {
        uid: req.params.id,
      },
      data: {
        status: "ACTIVE",
        razorpayPaymentId: razorpay_payment_id,
      },
    });
    res.status(200).json({
      status: true,
      data: updatedrentPayment,
    });
  }
);

const getAllRentPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, role } = req.user as User;

    if (role === "admin") {
      const commments = await prisma.rentPaymentSubcriptin.findMany({
        include: {
          user: {
            select: {
              name: true,
              profile_pic: true,
              phoneNo: true,
            },
          },
          availability: {
            include: {
              resident: true,
              roomType: true,
            },
          },
        },
      });
      return res.status(200).json({
        status: true,
        data: commments,
      });
    }
    const commments = await prisma.rentPaymentSubcriptin.findMany({
      where: {
        userId: id,
      },
      include: {
        user: {
          select: {
            name: true,
            profile_pic: true,
            phoneNo: true,
          },
        },
        availability: {
          include: {
            resident: true,
            roomType: true,
          },
        },
      },
    });
    res.status(200).json({
      status: true,
      data: commments,
    });
  }
);

export default {
  addNewRentPayment,
  getAllRentPayment,
  editRentPaymentById,
};
