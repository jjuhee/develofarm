import { getUserByUserId } from "@/app/(providers)/api"
import useUrlStore from "@/store/url"
import useUserStore from "@/store/user"
import { supabaseForClient } from "@/supabase/supabase.client"
import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useCustomModal } from "./useCustomModal"

interface Props {
  setIsAuthInitialized: Dispatch<SetStateAction<boolean>>
}

/** 로그아웃, 및 로그인/로그아웃 체크 및  관련 로직 */
const useSignInAndSignOut = ({ setIsAuthInitialized }: Props) => {
  const { setUser } = useUserStore((state) => state)
  const { setUrl } = useUrlStore((state) => state)

  const pathname = usePathname()

  const [sessionUserId, setSessionUserId] = useState<string>("")

  const { openCustomModalHandler } = useCustomModal()

  /** 저장된 유저 데이터 가져오기 */
  const { data: savedUserData, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserByUserId(sessionUserId),
    enabled: !!sessionUserId,
  })

  useEffect(() => {
    const subscription = supabaseForClient.auth.onAuthStateChange(
      (event, session) => {
        session && setSessionUserId(session.user.id)
        if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
          if (session && savedUserData) {
            if (savedUserData) {
              const userData = {
                id: savedUserData.id,
                nickName: savedUserData.user_nickname,
                avatarUrl: savedUserData.avatar_url,
                email: savedUserData.user_email,
                createdAt: savedUserData.created_at,
              }
              setUser(userData)
              setUrl(pathname)
            } else {
              openCustomModalHandler(
                "유저 데이터를 불러오지 못했습니다.\n로그인을 다시 실행해주세요",
                "alert",
              )
            }
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null)
        }
        // 로그인이나 로그아웃 상태를 가지고 있을 경우
        setIsAuthInitialized(true)
      },
    )
    return () => {
      subscription.data.subscription.unsubscribe()
    }
  }, [savedUserData])
}

export default useSignInAndSignOut
