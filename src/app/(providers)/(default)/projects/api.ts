import { supabaseForClient } from "@/supabase/supabase.client"

interface Values {
  orderBy?: string
  order?: number
  limit?: number
  offset?: number
  recruitStatus?: boolean
}

export async function getProjects({
  orderBy = "created_at",
  order = 1,
  limit = 0,
  offset = 0,
  recruitStatus = false,
}: Values) {
  const query = supabaseForClient.from("projects").select("*")

  limit !== 0 && query.range(offset, limit)

  recruitStatus && query.eq("recruit_status", false)

  order === 1
    ? query.order("created_at", { ascending: false })
    : order === 2
      ? query.order("created_at", { ascending: true })
      : query.order("recruit_status", { ascending: true })

  const { data, error } = await query
  if (error) console.log("error", error)

  return data
}

export async function getProject(projectId: string) {
  const { data: projectData, error: projectError } = await supabaseForClient
    .from("projects")
    .select(
      "*, user:users(id, user_nickname, avatar_url), region:project_regions(*)",
    )
    .eq("id", projectId)
    .single()

  if (projectError) console.log("error", projectError)

  return projectData || null
}

export async function getUser() {
  const { data: userData } = await supabaseForClient.auth.getUser()

  return userData || null
}

export async function deleteProject(projectId: string) {
  const { data: projectData } = await supabaseForClient
    .from("projects")
    .delete()
    .match({ id: projectId })

  return projectData
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
