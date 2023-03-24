import z from "zod";
import multerObjectValidator from "./multer.valudator";

export const addFeatureValidator = z.object({
  feature_name: z.string(),
  // feature_image: multerObjectValidator.length(1),
});
