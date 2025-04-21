import React from "react"
import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"

const textVariants = cva("", {
  variants: {
    variant: {
      paragraph: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      caption: "text-xs text-muted-foreground",
      helper: "text-xs italic text-muted-foreground",
      label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    },
  },
  defaultVariants: {
    variant: "paragraph",
  },
})

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {
  as?: React.ElementType
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, as: Component = "p", children, ...props }, ref) => {
    return (
      <Component className={cn(textVariants({ variant, className }))} ref={ref} {...props}>
        {children}
      </Component>
    )
  },
)
Text.displayName = "Text"

export { Text, textVariants }
