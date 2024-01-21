import { supabaseForClient } from "@/supabase/supabase.client"
import { TablesInsert } from "@/types/supabase"

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
