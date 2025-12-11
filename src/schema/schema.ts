import * as z from "zod";

export const loginSchema = z.object({
  email: z.email(),
});

export const signupSchema = z.object({
  outstation: z.string().min(1, "Please select a branch"),
  email: z.email(),
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),

  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(12, "Phone number must be at most 12 digits")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),

  // dateOfBirth: z
  //   .string()
  //   .refine(
  //     (val) => {
  //       const date = new Date(val);
  //       return !isNaN(date.getTime());
  //     },
  //     { message: "Invalid date format" }
  //   )
  //   .refine(
  //     (val) => {
  //       const date = new Date(val);
  //       const age = new Date().getFullYear() - date.getFullYear();
  //       return age >= 13; // example minimum age
  //     },
  //     { message: "You must be at least 13 years old" }
  //   ),

  address: z.string().min(5, "Address must be at least 5 characters"),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export type AuthSchema = z.infer<
  typeof loginSchema | typeof signupSchema | typeof otpSchema
>;

// Helper
export const getAuthSchema = (type: "login" | "signup" | "otp") =>
  type === "login" ? loginSchema : type === "signup" ? signupSchema : otpSchema;

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
export type OtpValues = z.infer<typeof otpSchema>;
