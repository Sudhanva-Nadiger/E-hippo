"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Ban, CheckCircle2Icon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Store } from "@/lib/schema";
import { SettingsFormData, settingsFormSchema } from '@/lib/zodSchemas';

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import DeleteStoreButton from "./DeleteButton";

interface SettingsFormProps {
    store: Store;
}

export default function SettingsForm({
    store
}: SettingsFormProps) {

    const form = useForm<SettingsFormData>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: { ...store },
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: SettingsFormData) => {
        try {
            await axios.patch(`/api/store/${store.id}`, data);
            toast({
                title: "Success",
                description: "Successfully updated store settings!",
                toastType: "success"
            })
            router.refresh();
        } catch (error) {
            toast({
                title: "Something Went Wrong!",
                description: "Could not update data.",
                toastType: "error",
            })
        }
    }

    const { errors, isSubmitting } = form.formState;

    return (
        <>  
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage your store preferences"
                />
                <DeleteStoreButton
                    isSubmitting={isSubmitting}
                    storeId={store.id}
                 />
            </div>
            <Separator />

            <Form {...form}>
                {errors.root && <p className='text-red-500'>{errors.root.message}</p>}

                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            type="text"
                                            placeholder="Store name..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button 
                        className="ml-auto" 
                        type="submit"
                        disabled={isSubmitting}
                    >
                            Save changes
                    </Button>
                </form>
            </Form>
        </>
    );
}