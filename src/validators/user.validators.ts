import * as z from "zod";

const createUserValidators = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is requird" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is invalid" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password is too small-should be 6 character" }),
    passwordConfirm: z.string({ required_error: "passwordConfirm is requird" }),
  }),
});

export type createUserBodyType = z.infer<typeof createUserValidators>;
