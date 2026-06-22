import { z } from "zod";

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Task title must be at least 3 characters.")
    .max(100, "Task title must not exceed 100 characters."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description must not exceed 500 characters."),

  priority: z.enum(["Low", "Medium", "High"], {
    error: "Please select a priority.",
  }),

  dueDate: z.string().min(1, "Please select a due date."),

  status: z.enum(["In Progress", "Completed"], {
    error: "Please select a status.",
  }),
});

export default taskSchema;
