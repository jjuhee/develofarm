"use client"
import useUserStore from "@/store/user"
import { supabaseForClient } from "@/supabase/supabase.client"
import { Tables, TablesUpdate } from "@/types/supabase"
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { getNotifications, setNotification } from "../../api"
import { BsArrowUpRight } from "react-icons/bs"
import Image from "next/image"

interface Props {
  showTooltip: boolean
}

const Notifications = ({ showTooltip }: Props) => {
  const [notificationList, setNotificationList] = useState<
    Tables<"notifications">[]
  >([])
  const userId = useUserStore((state) => state.user?.id!)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: notifications } = useQuery({
    queryKey: ["notifications", { type: "header" }],
    queryFn: () => getNotifications(userId, false),
    enabled: !!userId,
  })

  const updateNotification = useMutation({
    mutationFn: setNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notifications"],
      })
    },
    onError: (error) => {
      console.log("update : onError", error)
    },
  })

  /* 이미 있는것 유즈 쿼리로 불러오기 */
  useEffect(() => {
    if (notifications) {
      setNotificationList(() => [...notifications])
    }
  }, [notifications])

  // TODO : 로직 Api로 옮기기
  /* 테이블을 구독하여 다 가져와서 내 id 와 비교 하여 보여줌 */
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
            queryClient.invalidateQueries({
              queryKey: ["notifications"],
            })
          }
        },
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  const onClickNotificationHandler = (noti: TablesUpdate<"notifications">) => {
    updateNotification.mutate({ id: noti.id, status: true })
    router.push(`/projects/${noti.project_id}`)
  }

  const onClickNotificationPageHandler = () => {
    router.push(`/profile/${userId}/notification`)
  }

  return (
    <div className="flex">
      <Image src="/icons/alert.png" alt="alert" width={20} height={20} />

      {notificationList.length > 0 && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main-lime opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-main-lime"></span>
        </span>
      )}
      {/* 드롭다운 */}
      <div className="relative text-[13px] *:bg-white">
        <ul
          className={`absolute flex flex-col mt-[3px] rounded-lg border-[1px] border-[#F2F4F7] shadow-md w-[243px] left-[-230px] top-[33px] z-10 ${
            showTooltip ? "visible" : "invisible"
          }`}
        >
          <h3 className="text-[14px] font-[600] h-[38px] leading-[38px] px-[16px]">
            알림
          </h3>
          {notificationList?.map((noti, index) => {
            if (index > 6) return null

            return (
              <li
                key={noti.id}
                className="cursor-pointer px-[18px] bg-white leading-[38px] h-[38px] first:rounded-t-lg last:rounded-b-lg hover:bg-[#DBFFB2] truncate"
                onClick={() => onClickNotificationHandler(noti)}
              >
                {getNotificationMessage(noti)}
              </li>
            )
          })}

          {notificationList.length === 0 && (
            <li className="px-[18px] bg-white text-[13px] leading-[38px] h-[38px] first:rounded-t-lg last:rounded-b-lg hover:bg-[#DBFFB2]">
              새 알림이 없습니다
            </li>
          )}

          <li
            className="flex items-center gap-1 font-[600] cursor-pointer px-[18px] bg-white leading-[38px] h-[38px] first:rounded-t-lg last:rounded-b-lg hover:bg-[#DBFFB2]"
            onClick={onClickNotificationPageHandler}
          >
            {notificationList.length > 7
              ? "알람페이지에서 더보기..."
              : "알림페이지로 이동"}
            <BsArrowUpRight />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Notifications

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
