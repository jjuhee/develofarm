import { createClient } from "@supabase/supabase-js"
// import { Database } from "./types/supabase";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseServerKey: string = process.env
  .SUPABASE_SERVER_SIDE_API_KEY as string
