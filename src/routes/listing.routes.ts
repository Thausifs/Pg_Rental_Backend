import { Router } from "express";
import roomType from "./roomType.routes";
import cityRouter from "./city.router";
import featureRoutes from "./features.routes";

const router = Router();

router.use("/roomType", roomType);
router.use("/city", cityRouter);
router.use("/feature", featureRoutes);

export default router;
