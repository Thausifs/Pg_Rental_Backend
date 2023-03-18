import { Router } from "express";
import roomType from "./roomType.routes";
import cityRouter from "./city.router";
import featureRoutes from "./features.routes";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { multerUpload } from "../middleware/uploadFile.middleware";
import { validateBody } from "../middleware/validateResource";
import { addListingValidator } from "../validators/listing.validator";
import listingController from "../controller/listing.controller";

const router = Router();

router.use("/roomType", roomType);
router.use("/city", cityRouter);
router.use("/feature", featureRoutes);

router.use(extractUser, restrictTo(["admin"]));

router.post(
  "/",
  multerUpload().fields([
    { name: "roomPhotos" },
    { name: "dinningAreaPhotos" },
    { name: "commonAreaPhotos" },
  ]),
  validateBody(addListingValidator),
  listingController.addNewListing
);

export default router;
