import { Router } from "express";

import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { multerUpload } from "../middleware/uploadFile.middleware";
import { validateBody, validateQuery } from "../middleware/validateResource";
import {
  addListingValidator,
  listingQueryValidator,
} from "../validators/listing.validator";
import listingController from "../controller/listing.controller";

import roomType from "./roomType.routes";
import cityRouter from "./city.router";
import featureRoutes from "./features.routes";
import availabilityRouter from "./availability.routes";

const router = Router();

router.use("/roomType", roomType);
router.use("/city", cityRouter);
router.use("/feature", featureRoutes);
router.use("/availability", availabilityRouter);

router.get(
  "/",
  validateQuery(listingQueryValidator),
  listingController.getAllListing
);

router.get("/:id", listingController.getListingDetailById);

router.use(extractUser, restrictTo(["admin"]));

router.post(
  "/",
  multerUpload().fields([
    { name: "roomPhotos" },
    { name: "dinningAreaPhotos" },
    { name: "commonAreaPhotos" },
    { name: "coverImage" },
  ]),
  validateBody(addListingValidator),
  listingController.addNewListing
);

export default router;
