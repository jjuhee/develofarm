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

export async function getBookmarks() {
  const { data, error } = await supabaseForClient.from("bookmarks").select("*")

  if (error) console.log("error", error)

  return data
}

export async function getBookmarksByUserId(userId: string) {
  const { data, error } = await supabaseForClient
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)

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
    .select("*, techs:techs(*)")
    .eq("project_id", projectId)

  const techs = data?.map((tech) => tech.techs?.tech_name)

  if (error) console.log("error", error)

  return techs
}

// export async function getTechs() {
//   const { data: position } = await supabaseForClient
//     .from("positions")
//     .select("*")

//   // console.log(position?.[0]?.id)
//   // 1. 모든 포지션을 가져온다
//   // 2. 포지션테크 에서 포지션 id가 같은.. 컬럼을 techs 를 엮어서 읽어와 .
//   // 3. data [, ,]

//   const { data, error } = await supabaseForClient
//     .from("position_tech")
//     .select("*, techs: techs(*)")
//   // .eq("position_id", position?.[0]?.id)

//   console.log(data)

//   const techs = data?.map((tech) => tech.techs)

//   if (error) console.log("error", error)

//   return techs
// }

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
    })

    // 모든 포지션에 대한 techs를 병렬로 가져오기
    const techs = await Promise.all(techsPromises)

    console.log("techs", techs)

    return techs
  } catch (error) {
    console.error("Error in getTechs:", error)
    throw error
  }
}
