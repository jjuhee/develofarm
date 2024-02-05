import { supabaseForClient } from "@/supabase/supabase.client"
import { TablesUpdate } from "@/types/supabase"

export async function getUserByUserId(userId: string) {
  const { data, error } = await supabaseForClient
    .from("users")
    .select("*")
    .eq("id", userId)

  if (error) return console.log(error)

  return data[0]
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

  if (error) console.log(error)
  return data
}

export async function setNotification(noti: TablesUpdate<"notifications">) {
  const { error } = await supabaseForClient
    .from("notifications")
    .update(noti)
    .eq("id", noti.id as string)

  if (error) console.log(error)
}

export async function deleteNotification(receiverId: string) {
  const { error } = await supabaseForClient
    .from("notifications")
    .delete()
    .eq("receiver_id", receiverId)
  if (error) console.log(error)
}
