import { z } from "zod";

export const createStoreFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export type CreateStoreFormData =  z.infer<typeof createStoreFormSchema>