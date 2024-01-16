import { supabaseForClient } from "@/supabase/supabase.client"

export const getUsers = async () => {
  const { data, error } = await supabaseForClient
    .from("users")
    .select("*")
    .eq("user_status", "지원중")

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

  if (error) return console.log(error.message)

  return data
}

// TODO: 유저가 갖고 있는 techs 가져오기
