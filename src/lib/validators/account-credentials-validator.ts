import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email({
    message: "Email address must be valid",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type TAuthCredientialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
