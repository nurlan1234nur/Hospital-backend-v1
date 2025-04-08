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
  date_of_onset: z
  .preprocess((arg) => {
    return typeof arg === "string" || arg instanceof Date
      ? new Date(arg)
      : undefined;
  }, z.date())
  .optional(),
  patient: z.string().min(1, "Өвчтөний ID оруулна уу"),
});

export const allergyUpdateSchema = z.object({
  allergy_name: z.string().min(1, "Харшлын нэр оруулна уу").optional(),
  severity: z.enum(["mild", "moderate", "severe"]).optional(),
  reaction: z.string().optional(),
  date_of_onset: z
  .preprocess((arg) => {
    return typeof arg === "string" || arg instanceof Date
      ? new Date(arg)
      : undefined;
  }, z.date())
  .optional(),
});

export const chronicDiseaseSchema = z.object({
  name: z.string().min(1, "Өвчний нэр оруулна уу"),
  description: z.string().optional(),
  diagnosisDate: z
  .preprocess((arg) => {
    return typeof arg === "string" || arg instanceof Date
      ? new Date(arg)
      : undefined;
  }, z.date()),
  patient: z.string().min(1, "Өвчтөний ID оруулна уу")
});

export const chronicDiseaseUpdateSchema = z.object({
  name: z.string().min(1, "Өвчний нэр оруулна уу").optional(),
  description: z.string().optional(),
  diagnosisDate: z
  .preprocess((arg) => {
    return typeof arg === "string" || arg instanceof Date
      ? new Date(arg)
      : undefined;
  }, z.date())
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

export const vitalSignsSchema = z.object({
  date: z.date().optional(),
  concsiousness_status: z.string().optional(),
  heart_rate: z.number().min(30).max(250).optional(),
  blood_pressure: z.string().optional(),
  temperature: z.number().min(30).max(45).optional(),
  respiration_rate: z.number().min(5).max(60).optional(),
  oxygen_saturation: z.number().min(50).max(100).optional(),
  height: z.number().min(30).max(250).optional(),
  weight: z.number().min(1).max(500).optional(),
  patient: z.string().min(1, "Өвчтөний ID оруулна уу"),
  medicalStaff: z.string().min(1, "Эмч/Сувилагчийн ID оруулна уу")
});

export const vitalSignsUpdateSchema = z.object({
  staffId: z.string().optional(), // Used for verification, not for storing
  date: z.date().optional(),
  concsiousness_status: z.string().optional(),
  heart_rate: z.number().min(30).max(250).optional(),
  blood_pressure: z.string().optional(),
  temperature: z.number().min(30).max(45).optional(),
  respiration_rate: z.number().min(5).max(60).optional(),
  oxygen_saturation: z.number().min(50).max(100).optional(),
  height: z.number().min(30).max(250).optional(),
  weight: z.number().min(1).max(500).optional()
});

export const dateRangeSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Огноо YYYY-MM-DD форматтай байх ёстой."),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Огноо YYYY-MM-DD форматтай байх ёстой.")
});