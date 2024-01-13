import { z } from "zod";

export const CredentialsValidator = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters long.",
  }),
});

export type TCredentialsValidator = z.infer<typeof CredentialsValidator>;
