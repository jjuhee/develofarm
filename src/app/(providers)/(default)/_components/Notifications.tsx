"use client"

import useUserStore from "@/store/user"
import { supabaseForClient } from "@/supabase/supabase.client"
import { Tables, TablesUpdate } from "@/types/supabase"
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { MouseEvent, useEffect, useState } from "react"
import { getNotifications, setNotification } from "../../api"

interface Props {
  showTooltip: boolean
}

const Notifications = ({ showTooltip }: Props) => {
  const [notificationList, setNotificationList] = useState<
    Tables<"notifications">[]
  >([])
  const { userId } = useUserStore((state) => state)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: notifications } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications(userId),
    enabled: !!userId,
  })

  const updateNotification = useMutation({
    mutationFn: setNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notifications", userId],
      })
      console.log("로그를 안찍으면 안지워져요.", notifications)
    },
  })

  //public schema의 projects 테이블을 구독, unmount시 구독취소
  // TODO : 로직 Api로 옮기기
  // 이미 있는것 유즈 쿼리로 불러오기
  // 테이블을 구독하여 다 가져와서 내 id 와 비교 하여 보여줌
  useEffect(() => {
    if (notifications) {
      setNotificationList(() => [...notifications])
    }
  }, [notifications])

  useEffect(() => {
    const channel = supabaseForClient
      .channel("db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload: RealtimePostgresInsertPayload<Tables<"notifications">>) => {
          const newItem = payload.new
          if (newItem.receiver_id === userId && newItem.status === false) {
            setNotificationList((oldList) => [newItem, ...oldList])
            console.log("noti", payload.new)
          }
        },
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const onClickNotificationHandler = (noti: TablesUpdate<"notifications">) => {
    router.push(`/projects/${noti.project_id}`)
    updateNotification.mutate({ id: noti.id, status: true })
  }

  const onClickNotificationPageHandler = () => {
    router.push(`/profile/${userId}/notification`)
  }

  return (
    <div>
      <div className="reletive text-[13px] *:bg-white">
        <ul
          className={`absolute flex flex-col mt-[3px] rounded-lg border-[1px] border-[#F2F4F7] shadow-md w-[243px] right-[60px] top-[70px] z-10 ${
            showTooltip ? "visible" : "invisible"
          }`}
        >
          <h3 className="text-[17px] font-[600] h-[38px] leading-[38px] px-[16px]">
            알림
          </h3>
          {notificationList?.map((noti, index) => {
            if (index > 6) return null

            return (
              <li
                key={noti.id}
                className="cursor-pointer px-[18px] bg-white leading-[38px] h-[38px] first:rounded-t-lg last:rounded-b-lg hover:bg-[#DBFFB2]"
                onClick={() => onClickNotificationHandler(noti)}
              >
                {/* TODO: 신청수락, 모집마감 추가, 길면 ...처리, 함수로 빼기 */}
                {noti.sender_nickname} 님이
                {noti.type === "comment" && "댓글을 남겼습니다."}
                {noti.type === "recomment" &&
                  "회원님의 댓글에 대댓글을 남겼습니다."}
                {noti.type === "invitation" &&
                  "프로젝트 초대요청을 보냈습니다."}
                {noti.type === "application" &&
                  "회원님의 프로젝트에 참여를 신청하였습니다."}
              </li>
            )
          })}

          <li
            className="font-[600] cursor-pointer px-[18px] bg-white leading-[38px] h-[38px] first:rounded-t-lg last:rounded-b-lg hover:bg-[#DBFFB2]"
            onClick={onClickNotificationPageHandler}
          >
            {notificationList.length > 7
              ? "알람페이지에서 더보기..."
              : "알림페이지로 이동"}
          </li>

          {notificationList.length === 0 && (
            <li className="cursor-pointer px-[18px] bg-white text-[13px] leading-[38px] h-[38px] first:rounded-t-lg last:rounded-b-lg hover:bg-[#DBFFB2]">
              알림이 없습니다
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Notifications
