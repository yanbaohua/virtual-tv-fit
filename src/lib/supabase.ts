import { createClient } from '@supabase/supabase-js'

// 使用 (import.meta as any) 来避开严格的类型检查
const env = (import.meta as any).env

const supabaseUrl = env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('致命错误：环境变量未加载！请确保 .env.local 位于项目根目录。')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)