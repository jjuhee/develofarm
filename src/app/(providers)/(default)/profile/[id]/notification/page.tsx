"use client"
import Button from "@/components/ui/Button"
import { deleteNotification, getNotifications } from "@/app/(providers)/api"
import useUserStore from "@/store/user"
import { Tables } from "@/types/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import Checkbox from "@/components/ui/Checkbox"
import { useProfileStore } from "@/store/profile"
import NotificationList from "../../_components/NotificationPage/NotificationList"

const NotificationPage = () => {
  const [notificationList, setNotificationList] = useState<
    Tables<"notifications">[]
  >([])
  const [filteredNotiList, setFilteredNotiList] = useState<
    Tables<"notifications">[]
  >([])
  const [checkState, setCheckState] = useState<boolean>(false)
  const userId = useUserStore((state) => state?.user?.id) as string

  const { id } = useParams<{ id: string }>()
  const setId = useProfileStore((state) => state.setId)
  const queryClient = useQueryClient()

  useEffect(() => {
    setId(id)
  }, [id, setId])

  const { data: notifications } = useQuery({
    queryKey: ["notifications", { type: "page" }],
    queryFn: () => getNotifications(userId),
    enabled: !!userId,
  })

  const deleteAllMuate = useMutation({
    mutationFn: deleteNotification,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notifications"],
      })
    },
    onError: (error) => {
      console.log("delete : onError", error)
    },
  })

  /* 이미 있는것 유즈 쿼리로 불러오기 */
  useEffect(() => {
    if (notifications) {
      setNotificationList(() => [...notifications])
      setFilteredNotiList(notifications.filter((noti) => noti.status === false))
    }
  }, [notifications])

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
          {!checkState && <NotificationList notiList={notificationList} />}
          {checkState && <NotificationList notiList={filteredNotiList} />}
        </ul>
      </div>
    </div>
  )
}

export default NotificationPage
