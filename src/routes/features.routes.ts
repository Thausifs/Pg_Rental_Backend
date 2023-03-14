import { Router } from "express";
import featureController from "../controller/feature.controller";
import catagoryController from "../controller/roomType.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { multerUpload } from "../middleware/uploadFile.middleware";
import { validateBody } from "../middleware/validateResource";
import { addFeatureValidator } from "../validators/feature.validator";

const router = Router({ mergeParams: true });

router.use(extractUser, restrictTo(["admin"]));

router.post(
  "/",
  multerUpload("").fields([{ name: "feature_image", maxCount: 2 }]),
  validateBody(addFeatureValidator),
  featureController.addFeature
);

export default router;
