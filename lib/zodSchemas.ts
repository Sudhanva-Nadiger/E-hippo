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

export const categoryFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    billboardId: z.string().min(1, {
        message: "BillboardId is required",
    }),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>

export const sizeFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    value: z.string().min(1, {
        message: "Value is required"
    })
});

export type SizeFormData = z.infer<typeof sizeFormSchema>


export const colorFormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    value: z.string().min(4).regex(/^#/, {
        message: "Value must be a valid hex code. Example: #000000"
    })
});

export type ColorFormData = z.infer<typeof colorFormSchema>