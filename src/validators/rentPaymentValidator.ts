import * as z from "zod";

export const addNewRentPayment = z.object({
  availabilityId: z.string(),
  userId: z.string(),
});
export type addNewRentPaymentType = z.infer<typeof addNewRentPayment>;

export const payemntSuccessForSubcriptionBody = z.object({
  razorpay_payment_id: z.string(),
  razorpay_subscription_id: z.string(),
  razorpay_signature: z.string(),
});
export type payemntSucessSubcriptionBodyType = z.infer<
  typeof payemntSuccessForSubcriptionBody
>;
