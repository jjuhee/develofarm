"use client"
import Button from "@/components/ui/Button"
import {
  deleteNotification,
  getNotifications,
  setNotification,
} from "@/app/(providers)/api"
import useUserStore from "@/store/user"
import { Tables, TablesUpdate } from "@/types/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Checkbox from "@/components/ui/Checkbox"
import { useProfileStore } from "@/store/profile"
//import useNotiStore from "@/store/notification"

const NotificationPage = () => {
  const [notificationList, setNotificationList] = useState<
    Tables<"notifications">[]
  >([])
  const [filteredNotiList, setFilteredNotiList] = useState<
    Tables<"notifications">[]
  >([])
  const [checkState, setCheckState] = useState<boolean>(false)
  const userId = useUserStore((state) => state?.user?.id) as string
  // const { notiState } = useNotiStore((state) => state)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { id } = useParams<{ id: string }>()
  const setId = useProfileStore((state) => state.setId)

  useEffect(() => {
    setId(id)
  }, [id, setId])

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

  const updateNotiMutate = useMutation({
    mutationFn: setNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notifications"],
      })
    },
  })

  const deleteAllMuate = useMutation({
    mutationFn: deleteNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notifications"],
      })
    },
  })

  /* 이미 있는것 유즈 쿼리로 불러오기 */
  useEffect(() => {
    if (notifications) {
      setNotificationList(() => [...notifications])
      setFilteredNotiList(notifications.filter((noti) => noti.status === false))
    }
  }, [notifications])

  const onClickNotificationHandler = (noti: TablesUpdate<"notifications">) => {
    router.push(`/projects/${noti.project_id}`)
    updateNotiMutate.mutate({ id: noti.id, status: true })
  }

  const onCheckFilterNotiHandler = () => {
    if (checkState) {
      setFilteredNotiList(() =>
        notificationList.filter((noti) => noti.status === false),
      )
    }
    setCheckState(!checkState)
  }

  const onClickRemoveAllNotiHandler = () => {
    deleteAllMuate.mutate(userId)
    setNotificationList([])
  }

  return (
    <div>
      <div className="flex justify-between items-center my-0 mx-auto py-[23px]">
        <div className="flex items-center">
          <Checkbox
            id="unreadNotificationsCheckbox"
            value={checkState}
            handler={onCheckFilterNotiHandler}
          />
          <label htmlFor="unreadNotificationsCheckbox" className="ml-2">
            읽지 않은 알림만 보기
          </label>
        </div>
        <div className="*:w-[100px] *:h-[36px] *:text-[15px] *:p-0">
          <Button
            type="border"
            text="전체 지우기"
            handler={onClickRemoveAllNotiHandler}
          />
        </div>
      </div>
      <div>
        <ul>
          {/* Todo: 컴포넌트 분리?;; */}
          {!checkState &&
            notificationList?.map((noti, index) => {
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
          {!checkState && notificationList.length === 0 && (
            <li className="p-[10px] bg-white leading-[38px] border-t-[1px] border-b-[1px]">
              <h2 className="font-[700]">새 알림이 없습니다.</h2>
              <br />
            </li>
          )}
          {checkState &&
            filteredNotiList?.map((noti, index) => {
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
          {checkState && filteredNotiList.length === 0 && (
            <li className="p-[10px] bg-white leading-[38px] border-t-[1px] border-b-[1px]">
              <h2 className="font-[700]">새 알림이 없습니다.</h2>
              <br />
            </li>
          )}
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
