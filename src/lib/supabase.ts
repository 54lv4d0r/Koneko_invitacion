import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gkhybimiqjvtbrlsnymo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_b5psAOGx1uZVlXcnyKyO4g_q5tOPe0w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
