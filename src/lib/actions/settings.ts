'use server'

import { createClient, createPublicClient } from '@/lib/supabase/server'
import { revalidatePath, unstable_cache, updateTag } from 'next/cache'

// Static cache wrapper for site settings
const getSettingsCached = unstable_cache(
  async () => {
    const supabase = createPublicClient()

    const { data, error } = await (supabase
      .from('site_settings') as any)
      .select('*')

    const settings: Record<string, string> = {}
    data?.forEach(({ key, value }: any) => {
      settings[key] = value
    })

    return { settings, error }
  },
  ['site-settings-data'],
  { revalidate: 3600, tags: ['site-settings'] }
)

export async function getSettings() {
  return getSettingsCached()
}

export async function upsertSetting(key: string, value: string) {
  const supabase = await createClient()

  const { error } = await (supabase
    .from('site_settings') as any)
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

  if (error) return { error: error.message }

  // Purge site settings cache immediately
  updateTag('site-settings')
  revalidatePath('/administrator/settings')
  return { success: true }
}
