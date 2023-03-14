import z from "zod";

export const addCatagoryValidator = z.object({
  name: z.string(),
});
