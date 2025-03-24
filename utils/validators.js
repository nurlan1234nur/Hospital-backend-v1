import { z } from "zod";

export const adminSignupSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" })
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  lastname: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" })
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const medicalStaffSignupSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" })
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  lastname: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" })
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const patientSignupSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" })
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  lastname: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" })
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  type: z.enum(["Student", "Staff", "Teacher"]),
});
