import z from "zod";

export const schemaSignIn = z.object({
  number: z.string().nonoptional(),
  code: z.string().min(6).max(6).optional(),
  cloudPassword: z.string().optional(),
})

export const schemaSignUp = z.object({
  number: z.string().nonoptional(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  code: z.string().min(6).max(6).optional(),
})