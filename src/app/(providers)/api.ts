import { supabaseForClient } from "@/supabase/supabase.client"

/** 로그인한 유저 아이디 가져오기 */
export const getUserId = async () => {
  const { data, error } = await supabaseForClient.auth.getUser()

  if (error) {
    console.error(error)
  }

  return data.user?.id
}

// 로그인한 유저 정보보
