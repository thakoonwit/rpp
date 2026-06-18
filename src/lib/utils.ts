import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getConditionLabel(grade: string): string {
  const labels: Record<string, string> = {
    'like-new': 'Like New',
    'excellent': 'Excellent',
    'very-good': 'Very Good',
    'good': 'Good',
    'fair': 'Fair',
  }
  return labels[grade] || grade
}

export function getConditionColor(percent: number): string {
  if (percent >= 99) return 'condition-like-new'
  if (percent >= 95) return 'condition-excellent'
  if (percent >= 90) return 'condition-very-good'
  if (percent >= 85) return 'condition-good'
  return 'condition-fair'
}
