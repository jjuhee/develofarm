import { supabaseForClient } from "@/supabase/supabase.client"
import { TablesUpdate } from "@/types/supabase"

/** 로그인한 유저 아이디 가져오기 */
export const getUserId = async () => {
  const { data, error } = await supabaseForClient.auth.getUser()

  if (error) {
    console.error(error)
  }

  return data.user?.id
}

/**
 * deafault, 현재 로그인 유저와 receiver_id 가 일치하는 알림 읽기
 * status===false, 아직 안읽은(status:false)알림만 읽기
 */
export async function getNotifications(userId: string, status?: boolean) {
  let query = supabaseForClient
    .from("notifications")
    .select("*")
    .eq("receiver_id", userId)
    .order("created_at", { ascending: false })

  if (status === false) {
    query = query.eq("status", false)
  }

  const { data, error } = await query

  if (error) console.log("error", error)
  return data
}

export async function setNotification(noti: TablesUpdate<"notifications">) {
  const { data, error } = await supabaseForClient
    .from("notifications")
    .update(noti)
    .eq("id", noti.id as string)
}

export async function deleteNotification(noti: TablesUpdate<"notifications">) {
  const { data, error } = await supabaseForClient
    .from("notifications")
    .delete()
    .eq("receiver_id", noti.receiver_id as string)
}
