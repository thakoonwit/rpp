import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-[family-name:var(--font-prompt)]",
  {
    variants: {
      variant: {
        default: "bg-[#121212] text-white",
        secondary: "bg-[#F8F8F8] text-[#121212] border border-[#E5E5E5]",
        active: "bg-emerald-100 text-emerald-800",
        sold: "bg-red-100 text-red-700",
        draft: "bg-yellow-100 text-yellow-800",
        reserved: "bg-blue-100 text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
