"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";


import Modal from "@/components/ui/modal";
import { CreateStoreFormData, createStoreFormSchema } from "@/lib/zodSchemas";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Ban, CheckCircle2Icon } from "lucide-react";


import type { NewStore } from "@/lib/schema";

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const { toast } = useToast();

    const form = useForm<CreateStoreFormData>({
        resolver: zodResolver(createStoreFormSchema),
        defaultValues: {
            name: "",
        }
    })

    const { isSubmitting } = form.formState;

    const onSubmit = async (formData: CreateStoreFormData) => {
        try {
            const { data } : { data: NewStore } = await axios.post("/api/store", formData)
            toast({
                title: data?.name || "Success",
                description: "Successfully created new store!",
                className: "bg-white h-fit p-4 w-fit",
                icon: <CheckCircle2Icon className="bg-green-500 w-6 h-6 rounded-full text-white" />,
            })
            
            window.location.assign(`/${data.id}`)
        } catch (error) {
            toast({
                title: "Something Went Wrong!",
                className: "bg-white h-fit p-4 w-fit",
                icon: <Ban className="bg-red-500 w-6 h-6 rounded-full text-white" />,
            })
        }
    }

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage product and categories."
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div className="space-y-4 py-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            disabled={isSubmitting}
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Store name, @ex: Suit" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex space-x-2 pt-6 items-center justify-end w-full">
                            <Button
                                disabled={isSubmitting}
                                variant={"outline"} 
                                onClick={storeModal.onClose}
                                type="button"
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}