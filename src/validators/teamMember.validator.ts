import z from "zod";

export const NewTeamMemberValidator = z.object({
  name: z.string(),
  title: z.string(),
  facebookUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
});

export type NewTeamMemberType = z.infer<typeof NewTeamMemberValidator>;
