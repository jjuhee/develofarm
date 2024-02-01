import { supabaseForClient } from "@/supabase/supabase.client"
import { Tables, TablesInsert, TablesUpdate } from "@/types/supabase"

export const getUsers = async ({
  pageParam,
  positionId,
}: {
  pageParam: number
  positionId?: string
}) => {
  const query = supabaseForClient
    .from("users")
    .select(
      "*, position: positions(*), user_tech(*, techs(*)), social_links(*)",
    )
    .eq("user_status", "지원 중")
    .range(pageParam!, pageParam! + 3)
    .order("created_at", { ascending: false })

  !!positionId && query.eq("positionId", positionId)

  const { data, error } = await query
  if (error) return console.log(error.message)

  return data || null
}

export const getPositions = async () => {
  const { data, error } = await supabaseForClient.from("positions").select("*")

  if (error) return console.log(error.message)

  return data
}

export const getPositionById = async ({
  positionId,
}: {
  positionId: string
}) => {
  const { data, error } = await supabaseForClient
    .from("positions")
    .select("*")
    .eq("id", positionId)

  if (error) return console.log(error.message)

  return data
}

export const getProjectByUserId = async (userId: string) => {
  const { data, error } = await supabaseForClient
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) return console.log(error.message)

  return data
}

//TODO: 멤버 초대
export const addNotification = async (
  notification: TablesInsert<"notifications">,
) => {
  try {
    const { data, error } = await supabaseForClient
      .from("notifications")
      .upsert({ ...notification })
      .select("*")

    if (error) {
      if (
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        // 중복된 키 값 오류 처리
        console.log("이미 존재하는 초대입니다.")
      } else {
        console.error(error.message)
      }
      return
    }
    return data
  } catch (error) {
    console.error("데이터베이스 오류:", error)
  }
}

export const getInvitationByReceiverId = async (receiverId: string) => {
  const { data, error } = await supabaseForClient
    .from("notifications")
    .select("*")
    .eq("receiver_id", receiverId)

  if (error) return console.log(error)

  return data
}
