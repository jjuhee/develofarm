import { supabaseForClient } from "@/supabase/supabase.client"

export async function getUsers() {
  const { data, error } = await supabaseForClient.from("users").select("*")

  if (error) console.log("error", error)

  return data
}
