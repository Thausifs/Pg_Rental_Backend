import { Router } from "express";

import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { multerUpload } from "../middleware/uploadFile.middleware";
import { validateBody, validateQuery } from "../middleware/validateResource";
import {
  addListingValidator,
  listingQueryValidator,
  listingQueryValidatorAdmin,
} from "../validators/listing.validator";
import listingController from "../controller/listing.controller";

import roomType from "./roomType.routes";
import cityRouter from "./city.router";
import featureRoutes from "./features.routes";
import scheduleVisitRoutes from "./scheduleVisit.routes";
import availabilityRouter from "./availability.routes";
import advanceBookingRouter from "./advanceBooking.routes";
import commentRouter from "./comment.router";
import rentPaymenRouter from "./rentPayment.routes";
import compainRouter from "./complain.routes";

const router = Router();

router.use("/roomType", roomType);
router.use("/city", cityRouter);
router.use("/feature", featureRoutes);
router.use("/availability", availabilityRouter);
router.use("/scheduleVisit", scheduleVisitRoutes);
router.use("/advanceBooking", advanceBookingRouter);
router.use("/:listingId/comment", commentRouter);
router.use("/rentPayment", rentPaymenRouter);
router.use("/complain", compainRouter);

router.use("/analitic", listingController.getAnaliticData);

router.get(
  "/",
  validateQuery(listingQueryValidator),
  listingController.getAllListing
);

router.get("/:id", listingController.getListingDetailById);

router.use(extractUser, restrictTo(["admin"]));

router.delete("/:id", listingController.deleteListingById);

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
router.get(
  "/admin/all",
  validateQuery(listingQueryValidatorAdmin),
  listingController.getAllListingAdmin
);

export default router;
