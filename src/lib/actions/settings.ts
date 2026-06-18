'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSettings() {
  const supabase = await createClient()

  const { data, error } = await (supabase
    .from('site_settings') as any)

    .select('*')

  const settings: Record<string, string> = {}
  data?.forEach(({ key, value }: any) => {
    settings[key] = value
  })


  return { settings, error }
}

export async function upsertSetting(key: string, value: string) {
  const supabase = await createClient()

  const { error } = await (supabase
    .from('site_settings') as any)

    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

  if (error) return { error: error.message }

  revalidatePath('/administrator/settings')
  return { success: true }
}
