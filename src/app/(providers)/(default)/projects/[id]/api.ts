import { supabaseForClient } from "@/supabase/supabase.client"
import { TablesInsert } from "@/types/supabase"

export async function setMember(newMember: TablesInsert<"project_members">) {
  console.log("newMember", newMember)
  const { error } = await supabaseForClient
    .from("project_members")
    .insert(newMember)

  if (error) console.log("error", error)
}

export async function getApplicationUser(
  projectId: string,
  userId: string | undefined,
) {
  const { data, error } = await supabaseForClient
    .from("project_members")
    .select("*, user:users(user_status)")
    .match({ project_id: projectId, user_id: userId })
    .single()
  if (error) console.log("error", error)
  return data
}

export async function getMembers(projectId: string) {
  const { data, error } = await supabaseForClient
    .from("project_members")
    .select(
      "*, users(user_nickname, avatar_url, positions(name), user_tech(id, techs(tech_name))), projects(number_of_people)",
    )
    .eq("project_id", projectId)
  if (error) console.log("error", error)
  return data
}

export async function getUserInProgress(currnetUserId: string) {
  const { data, error } = await supabaseForClient
    .from("users")
    .select("user_status")
    .eq("id", currnetUserId)
    .single()
  if (error) console.log("error", error)
  return data
}

export async function getMembersInProject(projectId: string) {
  const { data, error } = await supabaseForClient
    .from("project_members")
    .select("*, users(user_nickname, avatar_url)")
    .match({ project_id: projectId, application_status: true })
  if (error) console.log("error", error)
  return data
}

export async function setProjectInMember(projectId: string, userId: string) {
  const { error } = await supabaseForClient
    .from("project_members")
    .update({ application_status: true })
    .match({ project_id: projectId, user_id: userId })
  if (error) console.log("error", error)
}

export async function updateApplyingMember(projectId: string, userId: string) {
  const { error } = await supabaseForClient
    .from("project_members")
    .update({ application_status: false })
    .match({ project_id: projectId, user_id: userId })
  if (error) console.log("error", error)
}

export async function removeProjectInMember(id: string) {
  const { data, error } = await supabaseForClient
    .from("project_members")
    .delete()
    .match({ id: id })
  if (error) console.log("error", error)
}

export async function closeProject(projectId: string) {
  const { error } = await supabaseForClient
    .from("projects")
    .update({ recruit_status: true })
    .eq("id", projectId)
  if (error) console.log("error", error)
}

export async function getComments(projectId: string) {
  const { data, error } = await supabaseForClient
    .from("comments")
    .select(
      "*, user:users( user_nickname, avatar_url ), comments( * , user:users( user_nickname, avatar_url ))",
    )
    .order("created_at", { ascending: true })
    .eq("project_id", projectId)
    .is("comment_id", null)
  if (error) console.log("error", error)

  return data
}

export async function setComment(comment: TablesInsert<"comments">) {
  const { error } = await supabaseForClient.from("comments").insert(comment)
  if (error) console.log("error", error)
}

export async function editComment({
  id,
  content,
  updated_at,
}: {
  id: string
  content: string
  updated_at: string
}) {
  const { error } = await supabaseForClient
    .from("comments")
    .update({ content, updated_at })
    .eq("id", id)
  if (error) console.log("error", error)
}

export async function removeComment(commentId: string) {
  const { error } = await supabaseForClient
    .from("comments")
    .update({ del_yn: true })
    .eq("id", commentId)
  if (error) console.log("error", error)
}

export async function removeReComment(commentId: string) {
  const { error } = await supabaseForClient
    .from("comments")
    .delete()
    .eq("id", commentId)
  if (error) console.log("error", error)
}

export async function getProjectTechWithPosition(projectId: string) {
  const { data: techs, error: techError } = await supabaseForClient
    .from("project_tech")
    .select("id, techs(tech_name, position_tech(positions(name)))")
    .eq("project_id", projectId)
  if (!techs) {
    return
  }

  const techPosition = techs?.map((techs) => {
    return {
      tech_id: techs.id,
      tech_name: techs.techs?.tech_name,
      position_name: techs.techs?.position_tech[0].positions?.name,
    }
  })

  return techPosition
}

export async function updateProjectViews({
  projectId,
  countViews,
}: {
  projectId: string
  countViews: number
}) {
  const { data, error } = await supabaseForClient
    .from("projects")
    .update({ views: countViews })
    .eq("id", projectId)
    .select("*")
  if (error) console.log("error", error)

  return data
}
