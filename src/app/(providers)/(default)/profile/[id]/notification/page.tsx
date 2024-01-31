"use client"
import Button from "@/components/ui/Button"
import { getNotifications, setNotification } from "@/app/(providers)/api"
import useUserStore from "@/store/user"
import { supabaseForClient } from "@/supabase/supabase.client"
import { Tables, TablesUpdate } from "@/types/supabase"
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
//import useNotiStore from "@/store/notification"

const NotificationPage = () => {
  const [notificationList, setNotificationList] = useState<
    Tables<"notifications">[]
  >([])
  const { userId } = useUserStore((state) => state)
  // const { notiState } = useNotiStore((state) => state)
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    data: notifications,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications", { type: "page" }],
    queryFn: () => getNotifications(userId),
    enabled: !!userId,
  })

  const updateNotification = useMutation({
    mutationFn: setNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notifications"],
      })
      // TODO: 바로 안지워질 때 체크
      console.log("로그를 안찍으면 안지워져요.", notifications)
    },
  })

  /* 이미 있는것 유즈 쿼리로 불러오기 */
  useEffect(() => {
    if (notifications) {
      setNotificationList(() => [...notifications])
      console.log("jhee:알람페이지의 useEffect")
    }
  }, [notifications])

  const onClickNotificationHandler = (noti: TablesUpdate<"notifications">) => {
    router.push(`/projects/${noti.project_id}`)
    updateNotification.mutate({ id: noti.id, status: true })
  }

  return (
    <div>
      <div className="flex justify-between items-center my-0 mx-auto pt-[10px]">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="unreadNotificationsCheckbox"
            className="form-checkbox h-6 w-6 text-indigo-600 transition duration-150 ease-in-out"
          />
          <label htmlFor="unreadNotificationsCheckbox" className="ml-2">
            읽지 않은 알림만 보기
          </label>
        </div>
        <Button type="border" text="전체 지우기" handler={() => {}} />
      </div>
      <div>
        <ul>
          {notificationList?.map((noti, index) => {
            return (
              <li
                key={noti.id}
                className={`cursor-pointer p-[10px] bg-white leading-[38px] first:border-t-[1px] border-b-[1px]
                ${noti.status ? "bg-white" : "bg-[#efefef]"}`}
                onClick={() => onClickNotificationHandler(noti)}
              >
                <h2 className="font-[700]">
                  {noti.status ? "알림" : "읽지 않은 알림"}
                </h2>
                {/* TODO: 신청수락, 모집마감 추가, 함수로 빼기 */}
                <p className="">{getNotificationMessage(noti)}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default NotificationPage

const getNotificationMessage = (noti: Tables<"notifications">) => {
  let sender = `${noti.sender_nickname} 님이`
  switch (noti.type) {
    case "comment":
      return `${sender} 댓글을 남겼습니다.`
    case "recomment":
      return `${sender} 대댓글을 남겼습니다.`
    case "invitation":
      return `${sender} 프로젝트 초대요청을 보냈습니다.`
    case "application":
      return `${sender} 회원님의 프로젝트에 참여를 신청하였습니다.`
    case "acception":
      return `회원님이 신청하신 프로젝트에 참여 멤버가 되었습니다.`
    case "rejection":
      return `회원님이 신청하신 프로젝트에 함께하지 못하게 되었습니다.`
  }
}
