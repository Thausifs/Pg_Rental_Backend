import z from "zod";

export const addAdavanceBookingBodyValidator = z.object({
  roomTypeName: z.string(),
  user_name: z.string(),
  residentId: z.string(),
  phoneNo: z.string(),
  date: z.string(),
});

export type adddAdvanceBookingType = z.infer<
  typeof addAdavanceBookingBodyValidator
>;

export const payemntSuccessBodyValidator = z.object({
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  razorpay_order_id: z.string(),
});
export type payemntSuccessBodyType = z.infer<
  typeof payemntSuccessBodyValidator
>;
