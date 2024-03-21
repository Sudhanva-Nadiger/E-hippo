"use client";


import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Ban, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteStoreButtonProps {
    isSubmitting: boolean;
    storeId: number
}

export default function DeleteStoreButton({
    isSubmitting,
    storeId
}: DeleteStoreButtonProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/store/${storeId}`)
            toast({
                title: "Deleted the store successfully",
                toastType: "success"
            })
            router.refresh();
            router.push("/");
        } catch (error) {
            toast({
                title: "Something Went Wrong!",
                description: " Could not update data.",
                toastType: "error"
            })
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete}
                loading={loading}
            />
            <Button
                disabled={isSubmitting}
                variant={"destructive"}
                size={"sm"}
                onClick={() => setOpen(true)}
            >
                <Trash className="h-4 w-4" />
            </Button>
        </>
    )
}