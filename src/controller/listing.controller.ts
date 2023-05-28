import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import catchAsync from "../utils/catchAsync";
import { multerFiledType } from "../utils/Types/multer.types";
import { addListingType, listingQuery } from "../validators/listing.validator";
import AppError from "../utils/AppError";
import { P } from "pino";

const prisma = new PrismaClient();

const addNewListing = catchAsync(
  async (req: Request<any, any, addListingType>, res: Response) => {
    const files = req.files as multerFiledType;

    const {
      location,
      city,
      name,
      seoTitle,
      description,
      hotelSupportNumber,
      googleMapUrl,
      feature,
    } = req.body;

    const newLocation = await prisma.location.create({
      data: {
        ...location,
      },
    });
    const getCity = await prisma.city.findFirst({
      where: {
        slug: city,
      },
    });

    const newListing = await prisma.resident.create({
      data: {
        name,
        seoTitle,
        description,
        hotelSupportNumber,
        googleMapUrl,
        locationId: newLocation.id,
        cityId: getCity?.id as string,
      },
    });
    feature.forEach(async (ele) => {
      await prisma.featureResident.create({
        data: {
          featureId: ele as string,
          residentId: newListing.id,
        },
      });
    });

    const roomPhotos = files["roomPhotos"];
    if (roomPhotos) {
      roomPhotos.forEach(async (ele) => {
        await prisma.residentRoomImage.create({
          data: {
            ...ele,
            residentId: newListing.id,
          },
        });
      });
    }
    const dinningAreaPhotos = files["dinningAreaPhotos"];
    if (dinningAreaPhotos) {
      dinningAreaPhotos.forEach(async (ele) => {
        await prisma.residentDinningImage.create({
          data: {
            ...ele,
            residentId: newListing.id,
          },
        });
      });
    }
    const commonAreaPhotos = files["commonAreaPhotos"];
    if (commonAreaPhotos) {
      commonAreaPhotos.forEach(async (ele) => {
        await prisma.residentCommonAreaImage.create({
          data: {
            ...ele,
            residentId: newListing.id,
          },
        });
      });
    }
    const coverImages = files["coverImage"];
    if (coverImages) {
      coverImages.forEach(async (ele) => {
        await prisma.residentCoverImage.create({
          data: {
            ...ele,
            residentId: newListing.id,
          },
        });
      });
    }

    res.status(201).json({
      status: true,
      data: newListing,
    });
  }
);
const getAllListing = catchAsync(
  async (
    req: Request<any, any, any, listingQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { limit, page, city, typeOfRoom } = req.query;
    const allListing = await prisma.resident.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        city: {
          slug: {
            contains: city,
          },
        },
        AvailAbility: {
          some: {
            numberOfOccupancies: {
              gt: 0,
            },
            roomType: {
              slug: {
                contains: typeOfRoom,
              },
            },
          },
        },
      },
      include: {
        FeatureResident: {
          include: {
            feature: true,
          },
        },
        roomPhotos: {
          select: {
            id: true,
            path: true,
          },
        },
        coverImage: {
          select: {
            id: true,
            path: true,
          },
        },
        dinningAreaPhotos: {
          select: {
            id: true,
            path: true,
          },
        },
        commonAreaPhotos: {
          select: {
            id: true,
            path: true,
          },
        },
        AvailAbility: {
          select: {
            uid: true,
            price: true,
            numberOfOccupancies: true,
            planIdRazorpay: true,
            roomType: {
              select: {
                typeOfRoom: true,
              },
            },
          },
          where: {
            roomType: {
              slug: typeOfRoom,
            },
          },
        },
        location: true,
        city: true,
      },
    });
    res.status(200).json({
      status: true,
      length: allListing.length,
      page,
      limit,
      data: allListing,
    });
  }
);
const getAllListingAdmin = catchAsync(
  async (
    req: Request<any, any, any, listingQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { limit, page, city } = req.query;
    const allListing = await prisma.resident.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        AvailAbility: {
          some: {
            numberOfOccupancies: {
              gt: 0,
            },
          },
        },

        city: {
          slug: {
            contains: city,
          },
        },
      },
      include: {
        FeatureResident: {
          include: {
            feature: true,
          },
        },
        roomPhotos: {
          select: {
            id: true,
            path: true,
          },
        },
        coverImage: {
          select: {
            id: true,
            path: true,
          },
        },
        dinningAreaPhotos: {
          select: {
            id: true,
            path: true,
          },
        },
        commonAreaPhotos: {
          select: {
            id: true,
            path: true,
          },
        },
        AvailAbility: {
          select: {
            uid: true,
            price: true,
            numberOfOccupancies: true,
            roomType: {
              select: {
                typeOfRoom: true,
              },
            },
          },
        },

        location: true,
        city: true,
      },
    });
    res.status(200).json({
      status: true,
      length: allListing.length,
      page,
      limit,
      data: allListing,
    });
  }
);
const getListingDetailById = catchAsync(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const listingDetail = await prisma.resident.findFirst({
      where: {
        id: req.params.id,
      },
      include: {
        FeatureResident: {
          include: {
            feature: true,
          },
        },
        roomPhotos: {
          select: {
            id: true,
            path: true,
          },
        },
        coverImage: {
          select: {
            id: true,
            path: true,
          },
        },
        dinningAreaPhotos: {
          select: {
            id: true,
            path: true,
          },
        },
        commonAreaPhotos: {
          select: {
            id: true,
            path: true,
          },
        },
        AvailAbility: {
          select: {
            uid: true,
            price: true,
            planIdRazorpay: true,
            numberOfOccupancies: true,
            roomType: {
              select: {
                typeOfRoom: true,
              },
            },
          },
        },

        location: true,
        city: true,
      },
    });
    if (!listingDetail) {
      return next(new AppError("Listing Not found", 400));
    }
    res.status(200).json({
      status: true,
      data: listingDetail,
    });
  }
);

const getAnaliticData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const numberOfScheduleVisit = await prisma.schedule_Visit.aggregate({
      _count: {
        uid: true,
      },
      where: {
        completionState: "scheduled",
      },
    });
    const numberOfReview = await prisma.comment.aggregate({
      _count: {
        id: true,
      },
    });
    const numberOfAdvanceBooking = await prisma.advanceBooking.aggregate({
      _count: {
        uid: true,
      },
      where: {
        isPaymentSuccess: true,
      },
    });
    res.status(200).json({
      numberOfScheduleVisit: numberOfScheduleVisit._count.uid,
      numberOfComment: numberOfReview._count.id,
      numberOfAdvanceBooking: numberOfAdvanceBooking._count.uid,
    });
  }
);
const deleteListingById = catchAsync(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const listing = await prisma.resident.findFirst({
      where: { id: req.params.id },
    });
    if (!listing) {
      res.status(400).json({
        message: "City Doesnot exist",
      });
    }
    await prisma.resident.delete({
      where: { id: req.params.id },
    });
    res.sendStatus(200);
  }
);

export default {
  addNewListing,
  getAllListing,
  getAllListingAdmin,
  getListingDetailById,
  getAnaliticData,
  deleteListingById,
};
