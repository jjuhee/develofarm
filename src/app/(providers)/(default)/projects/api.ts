import { supabaseForClient } from "@/supabase/supabase.client"

export async function getProjects() {
  const response = await supabaseForClient.from("projects").select("*")

  return response.data
}
