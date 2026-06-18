'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { slugify } from '@/lib/utils'

export async function getProducts({
  page = 1,
  limit = 20,
  category,
  search,
  status,
  featured,
}: {
  page?: number
  limit?: number
  category?: string
  search?: string
  status?: string
  featured?: boolean
} = {}) {
  const supabase = await createClient()
  const offset = (page - 1) * limit

  let query = (supabase.from('products') as any)
    .select(`
      *,
      product_images(*),
      categories(*)
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) {
    query = query.eq('status', status)
  } else {
    query = query.neq('status', 'draft')
  }

  if (category) {
    query = query.eq('categories.slug', category)
  }

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  if (featured !== undefined) {
    query = query.eq('featured', featured)
  }

  const { data, count, error } = await query

  return {
    products: data || [],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
    error,
  }
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await (supabase.from('products') as any)
    .select(`
      *,
      product_images(*),
      categories(*)
    `)
    .eq('slug', slug)
    .single()

  return { product: data, error }
}

export async function getAllProductsAdmin() {
  const supabase = await createClient()

  const { data, error } = await (supabase.from('products') as any)
    .select(`
      *,
      product_images(*),
      categories(name)
    `)
    .order('created_at', { ascending: false })

  return { products: data || [], error }
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = Number(formData.get('price'))
  const condition_percent = Number(formData.get('condition_percent'))
  const condition_grade = formData.get('condition_grade') as string
  const repair_notes = formData.get('repair_notes') as string
  const inspection_notes = formData.get('inspection_notes') as string
  const category_id = formData.get('category_id') as string
  const featured = formData.get('featured') === 'true'
  const status = formData.get('status') as string

  const slug = slugify(name) + '-' + Date.now()

  const { data, error } = await (supabase.from('products') as any)
    .insert({
      name,
      slug,
      description,
      price,
      condition_percent,
      condition_grade,
      repair_notes,
      inspection_notes,
      category_id: category_id || null,
      featured,
      status,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/products')
  revalidatePath('/administrator/products')
  redirect(`/administrator/products/${data.id}/edit`)
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = Number(formData.get('price'))
  const condition_percent = Number(formData.get('condition_percent'))
  const condition_grade = formData.get('condition_grade') as string
  const repair_notes = formData.get('repair_notes') as string
  const inspection_notes = formData.get('inspection_notes') as string
  const category_id = formData.get('category_id') as string
  const featured = formData.get('featured') === 'true'
  const status = formData.get('status') as string

  const { error } = await (supabase.from('products') as any)
    .update({
      name,
      description,
      price,
      condition_percent,
      condition_grade,
      repair_notes,
      inspection_notes,
      category_id: category_id || null,
      featured,
      status,
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/products')
  revalidatePath(`/products/${id}`)
  revalidatePath('/administrator/products')

  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  const { error } = await (supabase.from('products') as any).delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/products')
  revalidatePath('/administrator/products')
  return { success: true }
}

export async function uploadProductImage(
  productId: string,
  file: File,
  isPrimary: boolean = false
) {
  const supabase = await createClient()

  const ext = file.name.split('.').pop()
  const fileName = `${productId}/${Date.now()}.${ext}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('products')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    return { error: uploadError.message }
  }

  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(fileName)

  if (isPrimary) {
    await (supabase.from('product_images') as any)
      .update({ is_primary: false })
      .eq('product_id', productId)
  }

  const { data, error } = await (supabase.from('product_images') as any)
    .insert({
      product_id: productId,
      url: publicUrl,
      alt: '',
      is_primary: isPrimary,
      sort_order: 0,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/administrator/products/${productId}/edit`)
  return { image: data }
}

export async function deleteProductImage(imageId: string, productId: string) {
  const supabase = await createClient()
  const { error } = await (supabase.from('product_images') as any).delete().eq('id', imageId)
  if (error) return { error: error.message }
  revalidatePath(`/administrator/products/${productId}/edit`)
  return { success: true }
}
