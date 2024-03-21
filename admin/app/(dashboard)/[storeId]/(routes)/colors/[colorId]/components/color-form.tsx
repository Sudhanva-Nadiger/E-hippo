"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import AlertModal from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Heading from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ColorFormData, colorFormSchema } from "@/lib/zodSchemas"
import { useToast } from "@/components/ui/use-toast"
import { Color } from "@/lib/schema"


interface ColorFormProps {
  initialData: Color | null;
};

export function ColorForm({
  initialData
}: ColorFormProps) {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit color' : 'Create color';
  const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';
  const toastMessage = initialData ? 'Color updated.' : 'Color created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ColorFormData>({
    resolver: zodResolver(colorFormSchema),
    defaultValues: initialData || {
      name: '',
      value: ''
    }
  });

  const onSubmit = async (data: ColorFormData) => {
    setLoading(true);
    try {
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast({
        title: toastMessage,
        toastType: "success",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        toastType: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast({
        title: "Color deleted.",
        toastType: "success",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: "Make sure you removed all products using this color first",
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
      title="Delete color"
      description="Are you sure you want to delete this color? This action cannot be undone."
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            color="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Color name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input disabled={loading} placeholder="Color name..." {...field} />
                      <div style={{ backgroundColor: field.value}} className="border p-4 rounded-full" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};