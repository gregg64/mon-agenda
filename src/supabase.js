import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://joxtipthjchxxjgzzvku.supabase.co'
const supabaseKey = 'sb_publishable_Dpfiv-woHuXNE0u94jKA2w_-xzGjlgV'

export const supabase = createClient(supabaseUrl, supabaseKey)
