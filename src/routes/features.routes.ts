import { Router } from "express";
import featureController from "../controller/feature.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { imageUpload, multerUpload } from "../middleware/uploadFile.middleware";
import { validateBody } from "../middleware/validateResource";
import { addFeatureValidator } from "../validators/feature.validator";

const router = Router({ mergeParams: true });

router.get("/", featureController.getAllFeature);

router.use(extractUser, restrictTo(["admin"]));

router.delete("/:id",featureController.deleteFeatureById)

router.post(
  "/",
  imageUpload().fields([{ name: "feature_image", maxCount: 1 }]),
  validateBody(addFeatureValidator),
  featureController.addFeature
);

export default router;
