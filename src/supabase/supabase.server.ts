import { createClient } from "@supabase/supabase-js"

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseServerKey: string = process.env
  .SUPABASE_SERVER_SIDE_API_KEY as string

const supabaseForServer = createClient(supabaseUrl, supabaseServerKey)

// Export for usage by the rest of the app
export { supabaseForServer }
