/**
 * ARCO Supabase Client
 * Initializes and exports the Supabase client instance.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required. Check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
