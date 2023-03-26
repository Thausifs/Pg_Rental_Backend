import { Router } from "express";
import availabilityController from "../controller/availability.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { validateBody } from "../middleware/validateResource";
import { addNewAvailabilityValidator } from "../validators/availability.validator";

const router = Router({ mergeParams: true });

router.get("/", availabilityController.getAllAvailability);

router.use(extractUser, restrictTo(["admin"]));

router.post(
  "/",
  validateBody(addNewAvailabilityValidator),
  availabilityController.addNewAvailability
);

export default router;
