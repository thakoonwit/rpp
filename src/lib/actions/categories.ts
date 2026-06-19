'use server'

import { createClient, createPublicClient } from '@/lib/supabase/server'
import { revalidatePath, unstable_cache, updateTag } from 'next/cache'
import { slugify } from '@/lib/utils'

// Static cache wrapper for categories list
const getCategoriesCached = unstable_cache(
  async () => {
    const supabase = createPublicClient()

    const { data, error } = await (supabase
      .from('categories') as any)
      .select('*')
      .order('sort_order')

    return { categories: data || [], error }
  },
  ['categories-list'],
  { revalidate: 3600, tags: ['categories'] }
)

export async function getCategories() {
  return getCategoriesCached()
}

export async function createCategory(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const icon = formData.get('icon') as string
  const sort_order = Number(formData.get('sort_order') || 0)
  const slug = slugify(name)

  const { error } = await (supabase
    .from('categories') as any)
    .insert({ name, slug, description, icon, sort_order })

  if (error) return { error: error.message }

  // Purge categories cache immediately
  updateTag('categories')
  revalidatePath('/administrator/categories')
  revalidatePath('/')
  return { success: true }
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const icon = formData.get('icon') as string
  const sort_order = Number(formData.get('sort_order') || 0)

  const { error } = await (supabase
    .from('categories') as any)
    .update({ name, description, icon, sort_order })
    .eq('id', id)

  if (error) return { error: error.message }

  // Purge categories cache immediately
  updateTag('categories')
  revalidatePath('/administrator/categories')
  revalidatePath('/')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  const { error } = await (supabase.from('categories') as any).delete().eq('id', id)
  if (error) return { error: error.message }

  // Purge categories cache immediately
  updateTag('categories')
  revalidatePath('/administrator/categories')
  revalidatePath('/')
  return { success: true }
}
