import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long"),
    role: z.enum(["USER", "ORGANIZER"]),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});
