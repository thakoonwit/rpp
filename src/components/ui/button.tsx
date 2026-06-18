import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-[family-name:var(--font-prompt)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#121212] text-white hover:bg-[#2A2A2A] focus-visible:ring-[#121212]",
        secondary:
          "bg-[#F8F8F8] text-[#121212] border border-[#E5E5E5] hover:bg-[#E5E5E5] focus-visible:ring-[#121212]",
        outline:
          "border border-[#121212] text-[#121212] bg-transparent hover:bg-[#121212] hover:text-white focus-visible:ring-[#121212]",
        ghost:
          "text-[#121212] hover:bg-[#F8F8F8] focus-visible:ring-[#121212]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
        white:
          "bg-white text-[#121212] hover:bg-[#F8F8F8] focus-visible:ring-white",
        "outline-white":
          "border border-white text-white bg-transparent hover:bg-white hover:text-[#121212] focus-visible:ring-white",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
