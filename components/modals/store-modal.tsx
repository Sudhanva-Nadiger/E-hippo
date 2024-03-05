"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import Modal from "@/components/ui/modal"
import { CreateStoreFormData, createStoreFormSchema } from "@/lib/zodSchemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const form = useForm<CreateStoreFormData>({
        resolver: zodResolver(createStoreFormSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (data: CreateStoreFormData) => {
        //TODO : create new store
    }

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage product and categories."
            isOpen={true}
            onClose={storeModal.onClose}
        >
            <div className="space-y-4 py-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
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
                            <Button variant={"outline"} onClick={storeModal.onClose}>Cancel</Button>
                            <Button type="submit">Create</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    )
}