import { supabaseForClient } from "@/supabase/supabase.client"
import { TablesInsert, TablesUpdate } from "@/types/supabase"

/** 신청자 목록에 멤버 추가 */
export async function setMember(newMember: TablesInsert<"project_members">) {
  const { error } = await supabaseForClient
    .from("project_members")
    .insert(newMember)

  if (error) console.log("error", error)
}

/** 신청자 목록에 로그인한 유저 있는지 조회 */
export async function getApplicatinUser(projectId: string, userId: string) {
  const { data, error } = await supabaseForClient
    .from("project_members")
    .select("*")
    .match({ project_id: projectId, user_id: userId })
    .single()
  if (error) console.log("error", error)
  return data
}

/** 신청자 목록에 모든 멤버 조회 */
export async function getMembers(projectId: string) {
  const { data, error } = await supabaseForClient
    .from("project_members")
    .select("*, users(user_nickname, avatar_url)")
    .eq("project_id", projectId)
  if (error) console.log("error", error)
  return data
}

/** 프로젝트에 참여중인 멤버 조회 */
export async function getMembersInProject(projectId: string) {
  const { data, error } = await supabaseForClient
    .from("project_members")
    .select("*, users(user_nickname, avatar_url)")
    .match({ project_id: projectId, application_status: true })
  if (error) console.log("error", error)
  return data
}

/** 참여중인 멤버 등록 */
export async function setProjectInMember(projectId: string, userId: string) {
  const { error } = await supabaseForClient
    .from("project_members")
    .update({ application_status: true })
    .match({ project_id: projectId, user_id: userId })

  if (error) console.log("error", error)
}
