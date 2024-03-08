"use client";

import { use, useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    title?: string;
    description?: string;
}

export default function AlertModal({
    isOpen,
    onClose,
    onConfirm,
    loading,
    title,
    description,
}: AlertModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={title || "Delete Store"}
                description={description || "Are you sure you want to delete this store?"}
            >
                <div className="pt-x space-x-2 flex items-center justify-end w-full">
                    <Button
                        disabled={loading}
                        variant={"outline"}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        variant={"destructive"}
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    )
}