const { z } = require("zod");

// Creating an object schema
const signupSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(25, { message: "Name must not be more than 25 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(25, { message: "Email must not be more than 25 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(12, "Password can't be greater than 12 characters"),
});


const signinSchema = z.object({
  email: z
  .string({ required_error: "Email is required" })
  .trim()
  .email({ message: "Invalid email address" })
  .min(3, { message: "Email must be at least of 3 characters" })
  .max(25, { message: "Email must not be more than 25 characters" }),
password: z
  .string({ required_error: "Password is required" })
  .min(6, { message: "Password must be at least of 6 characters" })
  .max(12, "Password can't be greater than 12 characters"),
});

module.exports =  { signupSchema, signinSchema }; 
