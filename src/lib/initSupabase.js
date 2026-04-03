// Supabase client placeholder — configure when backend is ready
// npm install @supabase/supabase-js

let supabase = null;

export function getSupabase() {
  if (supabase) return supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('Supabase env vars not set. Backend features are disabled.');
    return null;
  }

  // Uncomment once @supabase/supabase-js is installed:
  // const { createClient } = require('@supabase/supabase-js');
  // supabase = createClient(url, key);
  return supabase;
}
