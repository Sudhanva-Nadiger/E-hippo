"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Server } from "lucide-react"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Button } from "./button"
import { useToast } from "@/components/ui/use-toast"

interface ApiAlertProps {
    title: string,
    description: string,
    variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
} as const

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

export default function ApiAlert({
    title,
    description,
    variant
}: ApiAlertProps) {

    const { toast }= useToast();

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast({
            title: "Description copied to clipboard",
            toastType: "success"
        })
    }

    return (
        <Alert>
            <Server className="w-4 h-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="rounded relative bg-muted px-[0.3rem] font-mono text-sm font-semibold">
                    {description}   
                </code>
                <Button 
                    variant={"outline"} 
                    size={"icon"}
                    onClick={onCopy}
                >
                    <Copy className="w-4 h-4" />
                </Button>
            </AlertDescription>
        </Alert>
    )
}