import z from "zod";

export const addNewAvailabilityValidator = z.object({
  residentId: z.string(),
  roomTypeId: z.string(),
  price: z.number(),
  numberOfOccupancies: z.number(),
});

export type addNewAvailabilityType = z.infer<
  typeof addNewAvailabilityValidator
>;
