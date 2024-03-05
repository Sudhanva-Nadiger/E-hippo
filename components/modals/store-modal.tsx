"use client"

import Modal from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"

export const StoreModal = () => {
    const storeModal = useStoreModal();

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage product and categories."
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Form goes here
        </Modal>
    )
}