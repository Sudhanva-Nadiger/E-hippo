"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Ban, CheckCircle2Icon } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, toastType, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-2 items-center">
              {
                toastType === "error" && (<Ban className="bg-red-500 w-6 h-6 rounded-full text-white" />)
              } 
              {
                toastType === "success" && (<CheckCircle2Icon className="bg-green-500 w-6 h-6 rounded-full text-white" />)
              }
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
