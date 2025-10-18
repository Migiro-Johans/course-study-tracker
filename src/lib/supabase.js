import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fail loudly in prod if misconfigured, warn in dev
if (!url || !key) {
  const msg = 'Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  if (import.meta.env.PROD) {
    throw new Error(msg)
  } else {
    console.warn(msg)
  }
}

export const supabase = createClient(url, key)