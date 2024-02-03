import { deleteNotification, setNotification } from "@/app/(providers)/api"
import { Tables, TablesUpdate } from "@/types/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React from "react"

interface Props {
  notiList: Tables<"notifications">[]
}

const NotificationList = ({ notiList }: Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const updateNotiMutate = useMutation({
    mutationFn: setNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notifications"],
      })
    },
  })

  const onClickNotificationHandler = (noti: TablesUpdate<"notifications">) => {
    router.push(`/projects/${noti.project_id}`)
    updateNotiMutate.mutate({ id: noti.id, status: true })
  }

  return (
    <>
      {notiList.map((noti, index) => {
        return (
          <li
            key={noti.id}
            className={`cursor-pointer p-[10px] leading-[38px] first:border-t-[1px] border-b-[1px]
                ${noti.status ? "bg-white" : "bg-[#efefef]"}`}
            onClick={() => onClickNotificationHandler(noti)}
          >
            <h2 className="font-[700]">
              {noti.status ? "알림" : "읽지 않은 알림"}
            </h2>
            <p className="">{getNotificationMessage(noti)}</p>
          </li>
        )
      })}
      {notiList.length === 0 && (
        <li className="p-[10px] bg-white leading-[38px] border-t-[1px] border-b-[1px]">
          <h2 className="font-[700]">새 알림이 없습니다.</h2>
          <br />
        </li>
      )}
    </>
  )
}

export default NotificationList

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
