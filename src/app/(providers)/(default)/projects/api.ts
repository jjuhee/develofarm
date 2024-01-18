import { supabaseForClient } from "@/supabase/supabase.client"
import { Database, Tables } from "@/types/supabase"
import { equal } from "assert"

/** 전체 프로젝트 리스트 가져오기 */
export async function getProjects({
  orderBy = "created_at",
  order = 1,
  limit = 0,
  offset = 0,
  recruitStatus = false,
  isOffline = null,
  startDate = "",
  endDate = "",
  numberOfPeople,
  regionId,
  techs,
}: TProjectsOptions) {
  const query = supabaseForClient.from("projects").select("*")

  /** 페이지 네이션 */
  limit !== 0 && query.range(offset, limit)

  /** 모집중인 프로젝트 */
  recruitStatus && query.eq("recruit_status", false)

  /** 정렬 */
  order === 1
    ? query.order("created_at", { ascending: false })
    : order === 2
      ? query.order("created_at", { ascending: true })
      : query.order("recruit_status", { ascending: true })

  /** 프로젝트 방식(온오프라인) */
  if (isOffline !== null) {
    query.eq("is_offline", isOffline)
  }

  /** 프로젝트 진행 날짜 */
  if (startDate !== "" && endDate === "") {
    query.gte("project_start_date", startDate)
  } else if (startDate === "" && endDate !== "") {
    query.lte("project_end_date", endDate)
  } else if (startDate !== "" && endDate !== "") {
    query
      .gte("project_start_date", startDate)
      .lte("project_start_date", endDate)
  }

  /** 활동 지역 */
  regionId && regionId !== "0" && query.eq("region_id", regionId)

  // TODO: 스택 필터링
  if ((techs?.length as number) > 0) {
    const techIds = techs?.map((tech) => tech.id)
    const { data: projectIds, error: projectError } = await supabaseForClient
      .from("project_tech")
      .select("project_id")
      .in("tech_id", techIds || [])

    // console.log("projectIds", projectIds)

    if (projectError) {
      console.error("Error fetching projectIds:", projectError.message)
      return
    }

    if (projectIds && projectIds.length > 0) {
      projectIds.map((projectId) => query.eq("id", projectId.project_id))
    }
  }

  const { data, error } = await query

  // console.log(data)

  if (error) console.log("error", error)

  return data
}

/** projectId 값과 일치하는 프로젝트 가져오기 */
export async function getProject(projectId: string) {
  const { data: projectData, error: projectError } = await supabaseForClient
    .from("projects")
    .select("*, user:users(*), region:project_regions(*)")
    .eq("id", projectId)
    .single()

  if (projectError) console.log("error", projectError)

  return projectData || null
}

/** projectId 값과 일치하는 해당 프로젝트 삭제 */
export async function removeProject(projectId: string) {
  const { error: projectError } = await supabaseForClient
    .from("projects")
    .delete()
    .match({ id: projectId })

  if (projectError) console.log("error", projectError)
}

/** 모든 북마크 데이터 가져오기 */
export async function getBookmarks() {
  const { data, error } = await supabaseForClient.from("bookmarks").select("*")

  if (error) console.log("error", error)

  return data as Tables<"bookmarks">[]
}

/** userId와 일치하는 북마크 데이터 가져오기 */
export async function getBookmarksByUserId(userId: string) {
  const { data, error } = await supabaseForClient
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)

  if (error) console.log("error", error)

  return data as Tables<"bookmarks">[]
}

/** 북마크 추가하기 */
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

/** 북마크 삭제하기 */
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

/** projectId와 일치하는 기술 스택 가져오기 */
export async function getProjectTech(projectId: string) {
  const { data, error } = await supabaseForClient
    .from("project_tech")
    .select("*, techs:techs(*)")
    .eq("project_id", projectId)

  const techs = data?.map((tech) => tech.techs?.tech_name)

  if (error) console.log("error", error)

  return techs
}

/** 포지션에 대한 기술 스택 가져오기 */
export async function getTechs() {
  try {
    // 1. 모든 포지션을 가져온다
    const { data: positions, error: positionError } = await supabaseForClient
      .from("positions")
      .select("*")

    if (positionError) {
      console.error("Error fetching positions:", positionError)
      throw positionError
    }

    // 2. 각 포지션에 대한 techs를 가져온다
    const techsPromises = positions.map(async (position) => {
      const { data: positionTechs, error: positionTechError } =
        await supabaseForClient
          .from("position_tech")
          .select("*, techs: techs(*)")
          .eq("position_id", position.id)

      if (positionTechError) {
        console.error(
          `Error fetching techs for position ${position.id}:`,
          positionTechError,
        )
        throw positionTechError
      }

      // 3. 가져온 techs 데이터를 반환한다
      return positionTechs?.map((tech) => tech.techs)
      //3. (position + 연결된 tech)의 배열을 반환한다.
      //return positionTechs
    })

    // 모든 포지션에 대한 techs를 병렬로 가져오기
    const techs = await Promise.all(techsPromises)

    return techs
  } catch (error) {
    console.error("Error in getTechs:", error)
    throw error
  }
}

/** 지역 가져오기 */
export async function getRegions() {
  const { data, error } = await supabaseForClient
    .from("project_regions")
    .select("*")

  if (error) console.log("error", error)

  return data
}

/** projectId와 일치하는 댓글 목록 가져오기 */
export async function getComments(projectId: string) {
  const { data, error } = await supabaseForClient
    .from("comments")
    .select("*, users(*)")
    .eq("project_id", projectId)

  if (error) console.log("error", error)

  return data
}

/** 프로젝트 게시물에 댓글 작성 데이터에 추가 */
export async function setComment(newComment: string[]) {
  const { error } = await supabaseForClient
    .from("comments")
    .insert([{ ...newComment }])

  if (error) console.log("error", error)
}
