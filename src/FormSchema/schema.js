import * as z from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const passSchema = z.object({
  oldpass: z
    .string()
    .min(6, {message: "Password must be at least 6 characters."}),
  newpass: z  
    .string()
    .min(6, {message: "Password must be at least 6 characters."})
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 characters."),
  email: z.string().email("Invalid email address."),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender.",
  }),
  country: z.string().min(1, "Please select a country."),
  image: z.instanceof(FileList).refine(
    (files) => files.length>0,
    "Please select a user image."
  ).transform(files => files[0])
  .refine(
    (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
    "Only .jpg, .jpeg, and .png formats are supported"
  )
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "Image size must be less than 5MB"
  )
});