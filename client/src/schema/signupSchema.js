import { z } from "zod";

const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters.")
      .max(50, "Name must be at most 50 characters.")
      .trim(),
    email: z.email("Please enter a valid email address.").trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default signupSchema;
