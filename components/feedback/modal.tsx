"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  showCloseButton?: boolean
  closeOnClickOutside?: boolean
  closeOnEsc?: boolean
  size?: "sm" | "md" | "lg" | "xl" | "full"
  className?: string
  contentClassName?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  isDanger?: boolean
  isLoading?: boolean
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  closeOnClickOutside = true,
  closeOnEsc = true,
  size = "md",
  className,
  contentClassName,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isDanger,
  isLoading,
}: ModalProps) {
  const handleClose = React.useCallback(() => {
    if (!isLoading) {
      onClose()
    }
  }, [onClose, isLoading])

  const handleConfirm = React.useCallback(() => {
    onConfirm?.()
  }, [onConfirm])

  const handleCancel = React.useCallback(() => {
    if (onCancel) {
      onCancel()
    } else {
      handleClose()
    }
  }, [onCancel, handleClose])

  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    full: "sm:max-w-[calc(100vw-2rem)] sm:h-[calc(100vh-2rem)]",
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && closeOnClickOutside && !isLoading) {
          handleClose()
        }
      }}
      modal={true}
    >
      <DialogContent
        className={cn(sizeClasses[size], size === "full" && "flex flex-col", contentClassName)}
        onEscapeKeyDown={(e) => {
          if (!closeOnEsc || isLoading) {
            e.preventDefault()
          }
        }}
      >
        {(title || showCloseButton) && (
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && <DialogDescription>{description}</DialogDescription>}
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={handleClose}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            )}
          </DialogHeader>
        )}

        <div className={cn(size === "full" && "flex-1 overflow-auto")}>{children}</div>

        {(footer || confirmText || cancelText) && (
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            {footer || (
              <>
                {(cancelText || onCancel) && (
                  <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                    {cancelText || "Cancel"}
                  </Button>
                )}
                {(confirmText || onConfirm) && (
                  <Button
                    variant={isDanger ? "destructive" : "default"}
                    onClick={handleConfirm}
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    {confirmText || "Confirm"}
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
