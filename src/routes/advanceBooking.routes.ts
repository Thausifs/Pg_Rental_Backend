import { Router } from "express";

import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { validateBody } from "../middleware/validateResource";
import {
  addAdavanceBookingBodyValidator,
  payemntSuccessBodyValidator,
} from "../validators/advanceBooking.validator";
import advanceBookingController from "../controller/advanceBooking.controller";

const router = Router({ mergeParams: true });

router.post(
  "/",
  validateBody(addAdavanceBookingBodyValidator),
  advanceBookingController.addNewAdvanceBooking
);
router.patch(
  "/:id",
  validateBody(payemntSuccessBodyValidator),
  advanceBookingController.makeAdvanceBookingPaymentSuccess
);

router.use(extractUser, restrictTo(["admin"]));

router.get("/", advanceBookingController.getAllAdanceBooking);

export default router;
