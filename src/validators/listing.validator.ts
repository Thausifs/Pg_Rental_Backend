import * as z from "zod";

export const addListingValidator = z.object({
  name: z.string(),
  city: z.string(),
  seoTitle: z.string(),
  description: z.string(),
  feature: z.array(z.string()),
  googleMapUrl: z.string(),
  location: z.object({
    latitude: z.string(),
    longitude: z.string(),
    address: z.string(),
    description: z.string(),
  }),
});

export type addListingType = z.infer<typeof addListingValidator>;
