import { cn } from '@/lib/utils'

interface ConditionBadgeProps {
  percent: number
  grade: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

function getConditionStyle(percent: number): string {
  if (percent >= 99) return 'bg-[#121212] text-white'
  if (percent >= 95) return 'bg-[#2A2A2A] text-white'
  if (percent >= 90) return 'bg-[#5A5A5A] text-white'
  if (percent >= 85) return 'bg-[#D9D9D9] text-[#121212]'
  return 'bg-[#F0F0F0] text-[#121212]'
}

function getConditionLabel(grade: string): string {
  const labels: Record<string, string> = {
    'like-new': 'Like New',
    'excellent': 'Excellent',
    'very-good': 'Very Good',
    'good': 'Good',
    'fair': 'Fair',
  }
  return labels[grade] || grade
}

export function ConditionBadge({ percent, grade, className, size = 'md' }: ConditionBadgeProps) {
  const style = getConditionStyle(percent)
  const label = getConditionLabel(grade)

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2.5 py-1',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded font-bold font-[family-name:var(--font-prompt)] leading-none',
        style,
        sizeClasses[size],
        className
      )}
      aria-label={`สภาพ ${percent}% ${label}`}
    >
      {percent}%
      <span className="font-normal text-[0.65em] opacity-80">{label}</span>
    </span>
  )
}
