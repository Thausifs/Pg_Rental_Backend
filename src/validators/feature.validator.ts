import z from "zod";

export const addFeatureValidator = z.object({
  feature_name: z.string(),
});
