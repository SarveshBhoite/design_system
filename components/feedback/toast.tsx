"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success: "border-success bg-success text-success-foreground",
        error: "border-destructive bg-destructive text-destructive-foreground",
        warning: "border-warning bg-warning text-warning-foreground",
        info: "border-info bg-info text-info-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof Toast>, VariantProps<typeof toastVariants> {}

const ToastComponent = React.forwardRef<React.ElementRef<typeof Toast>, ToastProps>(
  ({ className, variant, ...props }, ref) => {
    return <Toast ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
  },
)
ToastComponent.displayName = "ToastComponent"

export interface ToastNotificationProps {
  title?: string
  description?: string
  variant?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
  action?: React.ReactNode
  onClose?: () => void
}

export function useToastNotification() {
  const { toast } = useToast()

  const showToast = React.useCallback(
    ({ title, description, variant = "default", duration = 5000, action, onClose }: ToastNotificationProps) => {
      let icon: React.ReactNode = null

      switch (variant) {
        case "success":
          icon = <CheckCircle className="h-5 w-5" />
          break
        case "error":
          icon = <XCircle className="h-5 w-5" />
          break
        case "warning":
          icon = <AlertCircle className="h-5 w-5" />
          break
        case "info":
          icon = <Info className="h-5 w-5" />
          break
      }

      return toast({
        title,
        description,
        variant,
        duration,
        action,
        onClose,
        icon,
      })
    },
    [toast],
  )

  return { showToast }
}

export { ToastComponent, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport }
