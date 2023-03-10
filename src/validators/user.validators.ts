import * as z from "zod";

export const createUserValidators = z.object({
  name: z.string({ required_error: "Name is requird" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is invalid" })
    .optional(),
  phoneNo: z.string(),
  address: z.string(),
  idProof: z.object({
    documentType: z.string(),
    documentDetail: z.string(),
  }),
});

export type createUserBodyType = z.infer<typeof createUserValidators>;
