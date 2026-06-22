import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z.string().min(1, "Password is required."),
});

export default loginSchema;
