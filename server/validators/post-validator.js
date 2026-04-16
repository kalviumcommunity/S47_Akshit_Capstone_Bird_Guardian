const { z } = require("zod");

const postSchema = z.object({
  name: z
    .string({ required_error: "Bird name is required" })
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  birdType: z
    .string({ required_error: "Bird type is required" })
    .trim()
    .min(2, { message: "Bird type must be at least 2 characters" }),
  birdColor: z
    .string({ required_error: "Bird color is required" })
    .trim()
    .min(3, { message: "Bird color must be at least 3 characters" }),
  address: z
    .string({ required_error: "Location address is required" })
    .trim()
    .min(5, { message: "Address must be at least 5 characters" }),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must not exceed 500 characters" })
    .optional(),
});

module.exports = { postSchema };
