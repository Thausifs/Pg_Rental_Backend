import { Router } from "express";
import cityController from "../controller/city.controller";
import extractUser from "../middleware/extractUser.middleware";
import restrictTo from "../middleware/restrictTo.middleware";
import { validateBody } from "../middleware/validateResource";
import { addCityValidator } from "../validators/city.validator";

const router = Router({ mergeParams: true });

router.get("/", cityController.getAllCity);

router.use(extractUser, restrictTo(["admin"]));

router.delete("/:id", cityController.deleteCityById);
router.post("/", validateBody(addCityValidator), cityController.addCity);

export default router;
