import z from "zod";

export const addCityValidator = z.object({
  name: z.string(),
});
