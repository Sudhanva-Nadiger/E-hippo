import { create } from "zustand";

import { Product } from "@/types";

interface ModalPreviewStore {
    isOpen: boolean;
    product: Product | null;
    open: (product: Product) => void;
    close: () => void;
}

export const useModalPreview = create<ModalPreviewStore>((set) => ({
    isOpen: false,
    product: null,
    open: (product) => set({ isOpen: true, product }),
    close: () => set({ isOpen: false, product: null }),
}));