import React from "react"
import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"

const headingVariants = cva("font-heading scroll-m-20", {
  variants: {
    level: {
      h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "text-3xl font-semibold tracking-tight lg:text-4xl",
      h3: "text-2xl font-semibold tracking-tight lg:text-3xl",
      h4: "text-xl font-semibold tracking-tight lg:text-2xl",
      h5: "text-lg font-semibold tracking-tight lg:text-xl",
      h6: "text-base font-semibold tracking-tight lg:text-lg",
    },
  },
  defaultVariants: {
    level: "h1",
  },
})

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, children, ...props }, ref) => {
    const Component = as || level || "h1"

    return (
      <Component className={cn(headingVariants({ level, className }))} ref={ref} {...props}>
        {children}
      </Component>
    )
  },
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
