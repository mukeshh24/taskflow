import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name must be at most 50 characters.")
    .trim(),
  email: z.email("Please enter a valid email address.").trim(),
  password: z
    .string()
    .trim()
    .refine(
      (value) => {
        if (value === "") return true;

        return (
          value.length >= 8 &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(value)
        );
      },
      {
        message:
          "Password must be at least 8 characters and contain uppercase, lowercase, number and special character.",
      },
    ),
});

export default profileSchema;
