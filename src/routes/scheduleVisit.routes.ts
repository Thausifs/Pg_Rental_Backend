import { Router } from "express";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { validateBody } from "../middleware/validateResource";
import {
  newScheduleVisitValidator,
  updateScheduleVisitValidator,
} from "../validators/scheduleVisit.validator";
import scheduleVisitController from "../controller/scheduleVisit.controller";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validateBody(newScheduleVisitValidator),
  scheduleVisitController.scheduleVisit
);

router.use(extractUser, restrictTo(["admin"]));

router.get("/", scheduleVisitController.getAllScheduleVisit);

router.patch(
  "/:id",
  validateBody(updateScheduleVisitValidator),
  scheduleVisitController.editScheduleVisit
);

router.delete("/:id", scheduleVisitController.deleteScheduleVisit);

export default router;
