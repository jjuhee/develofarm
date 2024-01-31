import { supabaseForClient } from "@/supabase/supabase.client"
import { Tables, TablesUpdate } from "@/types/supabase"

/** 로그인한 유저 아이디 가져오기 */
export const getUserId = async () => {
  const { data, error } = await supabaseForClient.auth.getUser()

  if (error) {
    console.error(error)
  }

  return data.user?.id
}

/** 현재 로그인 유저와 receiver_id 가 일치하는 아직 안읽은(status:false)알림 읽기 */
export async function getNotifications(userId: string) {
  const { data, error } = await supabaseForClient
    .from("notifications")
    .select("*")
    .eq("receiver_id", userId)
    .eq("status", false)
    .order("created_at", { ascending: false })

  if (error) console.log("error", error)

  return data
}

export async function setNotification(noti: TablesUpdate<"notifications">) {
  const { data, error } = await supabaseForClient
    .from("notifications")
    .update(noti)
    .eq("id", noti.id!)
}
