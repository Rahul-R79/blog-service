import { z } from "zod";

// Schema for Creating a Post
export const createPostSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title cannot exceed 100 characters"),

    content: z
        .string()
        .min(10, { message: "Content must be at least 10 characters long" }),

    image: z.string().nonempty("Cover image is required"),

    authorId: z.string().min(1, { message: "Author ID is required" }),
    category: z
        .number()
        .int()
        .refine((val) => val > 0, "A valid Category is required"),

    readTime: z
        .number()
        .positive("Read time must be a positive number")
        .default(1),
});

// Schema for Editing a Post
export const editPostSchema = z.object({
    id: z.string().min(1, "Post ID is required"),

    title: z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title cannot exceed 100 characters")
        .optional(),

    content: z
        .string()
        .min(10, { message: "Content must be at least 10 characters long" })
        .optional(),

    image: z.string().nonempty("Cover image is required").optional(),

    category: z
        .number()
        .int()
        .refine((val) => val > 0, "A valid Category is required")
        .optional(),

    readTime: z
        .number()
        .positive("Read time must be a positive number")
        .optional(),
});

export const formatZodError = (error: z.ZodError) => {
    const fields: Record<string, string> = {};

    error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
            const field = issue.path[0].toString();
            fields[field] = issue.message;
        }
    });

    return { fields };
};
