import { supabaseForClient } from "@/supabase/supabase.client"
import { TablesInsert } from "@/types/supabase"

/** 신청하기: 신청자 목록에 멤버 추가 */
export async function setMember(newMember: TablesInsert<"project_members">) {
  console.log("newMember", newMember)
  const { error } = await supabaseForClient
    .from("project_members")
    .insert(newMember)

  if (error) console.log("error", error)
}

/** 신청자 목록에 로그인한 유저 있는지 조회 */
export async function getApplicationUser(
  projectId: string,
  userId: string | undefined,
) {
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
    .select(
      "*, users(user_nickname, avatar_url, positions(name), user_tech(id, techs(tech_name))), projects(number_of_people)",
    )
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
  const { data, error } = await supabaseForClient
    .from("project_members")
    .update({ application_status: true })
    .match({ project_id: projectId, user_id: userId })
  if (error) console.log("error", error)
}

/** 참여중인 멤버 신청자 목록으로 전환 */
export async function updateApplyingMember(projectId: string, userId: string) {
  const { error } = await supabaseForClient
    .from("project_members")
    .update({ application_status: false })
    .match({ project_id: projectId, user_id: userId })
  if (error) console.log("error", error)
}

/** 신청자 멤버 삭제 */
export async function removeProjectInMember(id: string) {
  const { data, error } = await supabaseForClient
    .from("project_members")
    .delete()
    .match({ id: id })
  console.log(data, "삭제한데이터")
  if (error) console.log("error", error)
}

/** 프로젝트 게시물 작성자 인경우 마감하기 상태 바꾸기 */
export async function closeProject(projectId: string) {
  const { error } = await supabaseForClient
    .from("projects")
    .update({ recruit_status: true })
    .eq("id", projectId)

  if (error) console.log("error", error)
}

/** projectId와 일치하는 댓글&대댓글 목록 가져오기 */
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

/** 프로젝트 게시물에 댓글 추가 */
export async function setComment(comment: TablesInsert<"comments">) {
  const { error } = await supabaseForClient.from("comments").insert(comment)

  if (error) console.log("error", error)
}

/** 프로젝트 게시물에 댓글 수정 */
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

/** 프로젝트 게시물에 댓글 삭제 */
export async function removeComment(commentId: string) {
  const { error } = await supabaseForClient
    .from("comments")
    .update({ del_yn: true })
    .eq("id", commentId)

  if (error) console.log("error", error)
}

/** 프로젝트 게시물에 대댓글 삭제 */
export async function removeReComment(commentId: string) {
  const { error } = await supabaseForClient
    .from("comments")
    .delete()
    .eq("id", commentId)

  if (error) console.log("error", error)
}

/** 프로젝트 게시물 기술 조회 */
export async function getProjectTechWithPosition(projectId: string) {
  const { data: techs, error: techError } = await supabaseForClient
    .from("project_tech")
    .select("id, techs(tech_name, position_tech(positions(name)))")
    .eq("project_id", projectId)
  if (!techs) {
    console.log(techError)
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

  return data
}
