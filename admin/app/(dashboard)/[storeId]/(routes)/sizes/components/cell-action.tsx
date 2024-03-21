"use client";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { SizeColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps {
    data: SizeColumn
}

export default function CellAction({
    data
}: CellActionProps) {
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        toast({
            title: "Copied size id to clipboard",
            toastType: "success"
        })
    }

    const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
          router.refresh();
          toast({
            title: "Size deleted.",
            toastType: "success",
          });
        } catch (error: any) {
          toast({
            title: "Something went wrong.",
            description: "Make sure you removed all sizes using this product first",
            toastType: "error",
          });
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }

    return (
        <>
            <AlertModal
                isOpen={open}
                onConfirm={onDelete}
                onClose={() => setOpen(false)}
                loading={loading}
                title="Delete Size"
                description="Are you sure you want to delete this size?"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}