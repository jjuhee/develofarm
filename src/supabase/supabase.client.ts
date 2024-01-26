import { Database } from "@/types/supabase"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseServerKey: string = process.env
  .NEXT_PUBLIC_SUPABASE_CLIENT_SIDE_API_KEY as string

const supabaseForClient = createClient<Database>(
  supabaseUrl,
  supabaseServerKey,
  {
    auth: {
      autoRefreshToken: false, // All my Supabase access is from server, so no need to refresh the token
      detectSessionInUrl: false, // We are not using OAuth, so we don't need this. Also, we are manually "detecting" the session in the server-side code
      persistSession: false, // All our access is from server, so no need to persist the session to browser's local storage
    },
  },
)

// Export for usage by the rest of the app
export { supabaseForClient }
