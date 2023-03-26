import * as z from "zod";

export const addListingValidator = z.object({
  name: z.string(),
  city: z.string(),
  seoTitle: z.string(),
  feature: z.array(z.string()),
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

export const listingQueryValidator = z.object({
  page: z
    .string()
    .regex(/\d+/)
    .transform((val) => parseInt(val))
    .default("1"),
  limit: z
    .string()
    .regex(/\d+/)
    .transform((val) => parseInt(val))
    .default("5"),
  city: z
    .string()
    .optional()
    .transform((val) => val?.toLocaleLowerCase()),
  typeOfRoom: z
    .string()
    .optional()
    .transform((val) => val?.toLocaleLowerCase()),
});

export type listingQuery = z.infer<typeof listingQueryValidator>;

export type addListingType = z.infer<typeof addListingValidator>;
