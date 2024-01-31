import { supabaseForClient } from "@/supabase/supabase.client"

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
    .select("*, notifications(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) return console.log(error.message)

  return data
}

interface invitationValue {
  project_id: string
  receiver_id: string
  type: string
  sender_nickname: string
}

//TODO: 멤버 초대
export const inviteUser = async (invitation: invitationValue) => {
  const { data, error } = await supabaseForClient
    .from("notifications")
    .insert([{ ...invitation }])
    .select("*")

  if (error) return console.log(error.message)
  return data
}
