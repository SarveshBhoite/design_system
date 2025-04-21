"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Text } from "@/components/typography"
import { Label } from "@/components/ui/label"
import {
  Select as BaseSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, Check } from "lucide-react"

const selectWrapperVariants = cva("space-y-2", {
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

export interface SelectOption {
  value: string
  label: string
}

export interface SelectGroupOption {
  label: string
  options: SelectOption[]
}

export interface SelectProps extends VariantProps<typeof selectWrapperVariants> {
  label?: string
  helperText?: string
  errorMessage?: string
  successMessage?: string
  placeholder?: string
  options: SelectOption[] | SelectGroupOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  id?: string
  required?: boolean
  name?: string
  icon?: React.ReactNode
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      errorMessage,
      successMessage,
      status,
      placeholder,
      options,
      value,
      defaultValue,
      onChange,
      disabled,
      id,
      required,
      name,
      icon,
      ...props
    },
    ref,
  ) => {
    const selectId = React.useId()
    const helperTextId = `${selectId}-helper-text`
    const errorId = `${selectId}-error`
    const successId = `${selectId}-success`

    const hasError = status === "error" || !!errorMessage
    const hasSuccess = status === "success" || !!successMessage
    const currentStatus = hasError ? "error" : hasSuccess ? "success" : "default"

    const ariaDescribedBy = hasError ? errorId : hasSuccess ? successId : helperText ? helperTextId : undefined

    const isGrouped = options.length > 0 && "options" in options[0]

    return (
      <div className={cn(selectWrapperVariants({ status: currentStatus, className }))}>
        {label && (
          <Label htmlFor={selectId} className={cn(hasError && "text-destructive", hasSuccess && "text-success")}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}

        <BaseSelect
          value={value}
          defaultValue={defaultValue}
          onValueChange={onChange}
          disabled={disabled}
          name={name}
          required={required}
        >
          <SelectTrigger
            id={selectId}
            className={cn(
              icon && "pl-10",
              hasError && "border-destructive focus-visible:ring-destructive/20",
              hasSuccess && "border-success focus-visible:ring-success/20",
            )}
            aria-describedby={ariaDescribedBy}
            aria-invalid={hasError}
            ref={ref}
          >
            {icon && (
              <span className="absolute left-3 flex items-center justify-center text-muted-foreground">{icon}</span>
            )}
            <SelectValue placeholder={placeholder} />
            {hasError && <AlertCircle className="h-4 w-4 text-destructive ml-2" />}
            {hasSuccess && <Check className="h-4 w-4 text-success ml-2" />}
          </SelectTrigger>
          <SelectContent>
            {isGrouped
              ? // Render grouped options
                (options as SelectGroupOption[]).map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel>{group.label}</SelectLabel>
                    {group.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))
              : // Render flat options
                (options as SelectOption[]).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
          </SelectContent>
        </BaseSelect>

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
Select.displayName = "Select"

export { Select }
