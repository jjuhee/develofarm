import { supabaseForClient } from "@/supabase/supabase.client"
import { TablesInsert } from "@/types/supabase"

export async function addProject(project: TablesInsert<"projects">) {
  const { data, error } = await supabaseForClient
    .from("projects")
    .insert([project])
    .select()

  if (error) console.log("error", error)

  return data
}
