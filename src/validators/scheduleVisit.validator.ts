import * as z from "zod";

export const newScheduleVisitValidator = z.object({
  user_name: z.string().min(5),
  phoneNo: z.string().length(10),
  date: z.string(),
  time: z.string(),
  residentId: z.string(),
});

export type newScheduleVisitType = z.infer<typeof newScheduleVisitValidator>;
