import { supabaseForClient } from "@/supabase/supabase.client"

export const getUser = async () => {
  const { data, error } = await supabaseForClient.auth.getUser()

  return data.user?.id
}
