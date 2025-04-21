"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Text } from "@/components/typography"
import { Label } from "@/components/ui/label"
import { Input as BaseInput } from "@/components/ui/input"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, Check, X } from "lucide-react"

const inputWrapperVariants = cva("space-y-2", {
  variants: {
    status: {
      default: "",
      error: "",
      success: "",
    },
  },
  defaultVariants: {
    status: "default",
  },
})

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputWrapperVariants> {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, helperText, errorMessage, successMessage, status, leftIcon, rightIcon, onClear, id, ...props },
    ref,
  ) => {
    const inputId = id || React.useId()
    const helperTextId = `${inputId}-helper-text`
    const errorId = `${inputId}-error`
    const successId = `${inputId}-success`

    const hasError = status === "error" || !!errorMessage
    const hasSuccess = status === "success" || !!successMessage
    const currentStatus = hasError ? "error" : hasSuccess ? "success" : "default"

    const ariaDescribedBy = hasError ? errorId : hasSuccess ? successId : helperText ? helperTextId : undefined

    return (
      <div className={cn(inputWrapperVariants({ status: currentStatus, className }))}>
        {label && (
          <Label htmlFor={inputId} className={cn(hasError && "text-destructive", hasSuccess && "text-success")}>
            {label}
          </Label>
        )}

        <div className="relative">
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{leftIcon}</div>}

          <BaseInput
            id={inputId}
            className={cn(
              leftIcon && "pl-10",
              (rightIcon || onClear || hasError || hasSuccess) && "pr-10",
              hasError && "border-destructive focus-visible:ring-destructive/20",
              hasSuccess && "border-success focus-visible:ring-success/20",
            )}
            aria-invalid={hasError}
            aria-describedby={ariaDescribedBy}
            ref={ref}
            {...props}
          />

          {(rightIcon || onClear || hasError || hasSuccess) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {hasError && <AlertCircle className="h-4 w-4 text-destructive" />}
              {hasSuccess && <Check className="h-4 w-4 text-success" />}
              {!hasError && !hasSuccess && rightIcon}
              {onClear && (
                <button
                  type="button"
                  onClick={onClear}
                  className="ml-1 rounded-full p-1 text-muted-foreground hover:bg-muted"
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {helperText && !hasError && !hasSuccess && (
          <Text variant="helper" id={helperTextId} className="mt-1">
            {helperText}
          </Text>
        )}

        {hasError && errorMessage && (
          <Text variant="helper" id={errorId} className="mt-1 text-destructive">
            {errorMessage}
          </Text>
        )}

        {hasSuccess && successMessage && (
          <Text variant="helper" id={successId} className="mt-1 text-success">
            {successMessage}
          </Text>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
