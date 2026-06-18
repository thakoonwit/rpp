'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getOrders() {
  const supabase = await createClient()

  const { data, error } = await (supabase
    .from('orders') as any)

    .select(`
      *,
      products(name, price, slug)
    `)
    .order('created_at', { ascending: false })

  return { orders: data || [], error }
}

export async function createOrder(formData: FormData) {
  const supabase = await createClient()

  const customer_name = formData.get('customer_name') as string
  const customer_email = formData.get('customer_email') as string
  const customer_phone = formData.get('customer_phone') as string
  const product_id = formData.get('product_id') as string
  const notes = formData.get('notes') as string

  const { error } = await (supabase
    .from('orders') as any)

    .insert({
      customer_name,
      customer_email,
      customer_phone,
      product_id: product_id || null,
      notes,
      status: 'pending',
    })

  if (error) return { error: error.message }
  return { success: true }
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await createClient()

  const { error } = await (supabase
    .from('orders') as any)

    .update({ status })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/administrator/orders')
  return { success: true }
}
