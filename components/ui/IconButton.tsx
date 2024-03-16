"use client"

import { cn } from "@/lib/utils"
import { Button } from "./button"

export default function IconButton({
    className,
    children
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <Button
            asChild
            size={"icon"}
            className={cn("rounded-full flex items-center justify-center bg-white border hover:bg-white hover:bg-opacity-80 shadow-md p-2 transition", className)}
        >
            {children}
        </Button>
    )
}