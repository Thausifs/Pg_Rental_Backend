import { Router } from "express";
import catagoryController from "../controller/roomType.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { validateBody } from "../middleware/validateResource";
import { newScheduleVisitValidator } from "../validators/scheduleVisit.validator";
import scheduleVisitController from "../controller/scheduleVisit.controller";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validateBody(newScheduleVisitValidator),
  scheduleVisitController.scheduleVisit
);

router.use(extractUser, restrictTo(["user"]));

export default router;
