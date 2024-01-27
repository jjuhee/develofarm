import { Database } from "@/types/supabase"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseServerKey: string = process.env
  .NEXT_PUBLIC_SUPABASE_CLIENT_SIDE_API_KEY as string

const supabaseForClient = createClient<Database>(supabaseUrl, supabaseServerKey)

// Export for usage by the rest of the app
export { supabaseForClient }
