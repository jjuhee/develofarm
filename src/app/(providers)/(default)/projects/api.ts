import { supabaseForClient } from "@/supabase/supabase.client"

export async function getProjects() {
  const { data, error } = await supabaseForClient
    .from("projects")
    .select("*")
    .order("created_at")

  if (error) console.log("error", error)

  return data
}

export async function getBookmarks() {
  const { data, error } = await supabaseForClient.from("bookmarks").select("*")

  if (error) console.log("error", error)

  return data
}

export async function setBookmarks({
  projectId,
  currentUser,
}: {
  projectId: string
  currentUser: string
}) {
  const { data, error } = await supabaseForClient
    .from("bookmarks")
    .insert([{ user_id: currentUser, project_id: projectId }])
    .select("*")

  if (error) console.log("error", error)

  return data
}

export async function removeBookmarks({
  projectId,
  currentUser,
}: {
  projectId: string
  currentUser?: string
}) {
  const { error } = await supabaseForClient
    .from("bookmarks")
    .delete()
    .eq("project_id", projectId)

  if (error) console.log("error", error)
}

export async function getProjectTech(projectId: string) {
  const { data, error } = await supabaseForClient
    .from("project_tech")
    .select("*")
    .eq("project_id", projectId)

  if (error) console.log("error", error)

  return data
}
