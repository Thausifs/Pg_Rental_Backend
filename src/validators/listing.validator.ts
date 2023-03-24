import * as z from "zod";

export const addListingValidator = z.object({
  name: z.string(),
  city: z.string(),
  seoTitle: z.string(),
  feature: z.array(z.unknown()),
  location: z.object({
    latitude: z.string(),
    state: z.string(),
    longitude: z.string(),
    zip_code: z.string(),
    address: z.string(),
  }),
  description: z.string(),
  hotelSupportNumber: z.string(),
  googleMapUrl: z.string(),
});

export type addListingType = z.infer<typeof addListingValidator>;
