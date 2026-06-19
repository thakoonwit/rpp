import {
  Smartphone,
  Laptop,
  Camera,
  Watch,
  Footprints,
  ShoppingBag,
  Package,
  LucideProps
} from 'lucide-react'

interface CategoryIconProps extends Omit<LucideProps, 'ref'> {
  slug: string
}

export function CategoryIcon({ slug, className, ...props }: CategoryIconProps) {
  const iconProps = {
    className: className || 'w-8 h-8 text-[#5A5A5A] group-hover:text-[#121212] transition-colors duration-300',
    strokeWidth: 1.5,
    ...props
  }

  switch (slug) {
    case 'smartphones':
      return <Smartphone {...iconProps} />
    case 'laptops':
      return <Laptop {...iconProps} />
    case 'cameras':
      return <Camera {...iconProps} />
    case 'watches':
      return <Watch {...iconProps} />
    case 'shoes':
      return <Footprints {...iconProps} />
    case 'accessories':
      return <ShoppingBag {...iconProps} />
    default:
      return <Package {...iconProps} />
  }
}
