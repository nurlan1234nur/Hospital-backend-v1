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
//exam

export const examinationSchema = z.object({
  medicalStaff: z.string(),
  patient: z.string(),
  exam_date: z.date().optional(),
  doctors_examination: z.enum([
    "Initial", 
    "Follow-up",
    "Preventive",
    "Active Monitoring", 
    "Home Visit",
    "House Call"
  ]),
  exam_type: z.string().optional(),
  illness: z.string().optional(),
  surgery: z.string().optional(),
  callback: z.boolean().optional(),
  reason: z.string().optional(),
  sendToHigherLevel: z.boolean().optional(),
  isVioleted: z.boolean().optional(),
  sickDays: z.number().int().min(0).optional()
});

export const examinationUpdateSchema = z.object({
  staffId: z.string(), // Used for checking permission, will be removed before updating
  exam_date: z.date().optional(),
  doctors_examination: z.enum([
    "Initial", 
    "Follow-up",
    "Preventive",
    "Active Monitoring", 
    "Home Visit",
    "House Call"
  ]).optional(),
  exam_type: z.string().optional(),
  illness: z.string().optional(),
  surgery: z.string().optional(),
  callback: z.boolean().optional(),
  reason: z.string().optional(),
  sendToHigherLevel: z.boolean().optional(),
  isVioleted: z.boolean().optional(),
  sickDays: z.number().int().min(0).optional()
});

//allergy 
export const allergySchema = z.object({
  allergy_name: z.string().min(1, "Харшлын нэр оруулна уу"),
  severity: z.enum(["mild", "moderate", "severe"]),
  reaction: z.string().optional(),
  date_of_onset: z.date().optional(),
  patient: z.string().min(1, "Өвчтөний ID оруулна уу")
});

export const allergyUpdateSchema = z.object({
  allergy_name: z.string().min(1, "Харшлын нэр оруулна уу").optional(),
  severity: z.enum(["mild", "moderate", "severe"]).optional(),
  reaction: z.string().optional(),
  date_of_onset: z.date().optional()
});

export const chronicDiseaseSchema = z.object({
  name: z.string().min(1, "Өвчний нэр оруулна уу"),
  description: z.string().optional(),
  diagnosisDate: z.date().optional(),
  patient: z.string().min(1, "Өвчтөний ID оруулна уу")
});

export const chronicDiseaseUpdateSchema = z.object({
  name: z.string().min(1, "Өвчний нэр оруулна уу").optional(),
  description: z.string().optional(),
  diagnosisDate: z.date().optional()
});

//QUESTION

export const questionnaireSchema = z.object({
  question: z.string().min(1, "Асуултын агуулгыг оруулна уу"),
  answer:  z.string().min(1, "Асуултын хариултыг оруулна уу"),
  patient: z.string().min(1, "Өвчтөний ID оруулна уу"),
  examination: z.string().optional(),
  medicalStaff: z.string().min(1, "Эмч/Сувилагчийн ID оруулна уу")
});

export const questionnaireUpdateSchema = z.object({
  staffId: z.string().optional(), // This is for verification, not for storing
  question: z.string().min(1, "Асуултын агуулгыг оруулна уу").optional(),
  answer:z.string().min(1, "Асуултын хариултыг оруулна уу")
});

export const patientQuestionnaireResponseSchema = z.object({
  answer: z.array(z.string()).min(1, "Хариултыг оруулна уу")
});