import { z } from "zod";

export const createStoreFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export type CreateStoreFormData =  z.infer<typeof createStoreFormSchema>

export const settingsFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export type SettingsFormData = z.infer<typeof settingsFormSchema>

export const billBoardFormSchema = z.object({
    label: z.string().min(1, {
        message: "Label is required",
    }),
    imageUrl: z.string().min(1, {
        message: "Image URL is required",
    }),
  });
  
export type BillBoardFormData = z.infer<typeof billBoardFormSchema>