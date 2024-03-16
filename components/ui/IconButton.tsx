"use client"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { MouseEventHandler } from "react"

export default function IconButton({
    className,
    children,
    onClick
}: {
    className?: string
    children: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <Button
            size={"icon"}
            className={cn("rounded-full flex items-center justify-center bg-white border hover:bg-white hover:bg-opacity-80 shadow-md p-2 transition", className)}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}