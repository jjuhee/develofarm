import { TablesInsert } from "@/types/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React from "react"
import useUserStore from "@/store/user"
import {
  closeProject,
  getApplicationUser,
  removeProjectInMember,
  setMember,
} from "../../api"
import { useCustomModal } from "@/hooks/useCustomModal"
import Button from "@/components/ui/Button"
import useAddNotiMutate from "@/hooks/useAddNotiMutate"
import useLoginConfirmModal from "@/hooks/useLoginConfirmModal"
import { TProjectType } from "@/types/extendedType"

type Props = {
  project: TProjectType
  isWriter: boolean
}

const FooterAuthButton = ({ project, isWriter }: Props) => {
  const queryClient = useQueryClient()
  const { user } = useUserStore((state) => state)
  const { openCustomModalHandler } = useCustomModal()
  const openLoginConfirmModal = useLoginConfirmModal()
  const addNotiMutate = useAddNotiMutate()

  const applyUserId = project.user?.project_members.map((member) => member.id)

  const closeProjectMutate = useMutation({
    mutationFn: closeProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["project", { applyUserId }],
      })

      openCustomModalHandler("마감되었습니다!", "alert")
    },
    onError: (error) => {
      openCustomModalHandler(`Error: ${error}`, "alert")
    },
  })

  const addMemberMutate = useMutation({
    mutationFn: setMember,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["applyUser", { projectId: project.id }],
        exact: true,
      })
      openCustomModalHandler("신청이 완료되었습니다!", "alert")
    },
    onError: (error) => {
      openCustomModalHandler(`Error: ${error}`, "alert")
    },
  })

  const removeMemberMutate = useMutation({
    mutationFn: removeProjectInMember,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["applyUser", { projectId: project.id }],
      })
      openCustomModalHandler("신청이 취소되었습니다!", "alert")
    },
    onError: (error) => {
      openCustomModalHandler(`Error: ${error}`, "alert")
    },
  })

  const closeProjectButtonHandler = (id: string) => {
    const handler = () => {
      closeProjectMutate.mutate(id)
    }

    openCustomModalHandler(
      "마감을 진행하면\n다신 수정할 수 없습니다\n정말로 마감하시겠습니까?",
      "confirm",
      handler,
    )
  }

  const { data: applyUser, isLoading: applyUserIsLoading } = useQuery({
    enabled: user !== null,
    queryKey: ["applyUser", { projectId: project.id }],
    queryFn: () => getApplicationUser(project.id, user?.id as string),
  })

  const isApplicantAuthenticated =
    user?.id && applyUser?.user_id && user?.id === applyUser?.user_id

  if (applyUserIsLoading) return <div>is Loading...</div>

  const applyForProjectButtonHandler = () => {
    if (!user) return openLoginConfirmModal()

    if (applyUser?.user?.user_status !== "지원 중")
      return openCustomModalHandler(
        "지원 중인 유저만 신청이 가능합니다.\n내 프로필에서 상태를 확인해주세요.",
        "alert",
      )

    const newMember: TablesInsert<"project_members"> = {
      project_id: project.id,
      user_id: user.id as string,
    }
    const newReCommentNoti = {
      project_id: project.id,
      receiver_id: project.user_id,
      type: "application",
      sender_nickname: user?.nickName as string,
    }

    const handler = (message?: string) => {
      addMemberMutate.mutate({ ...newMember, appeal_message: message })
      addNotiMutate(newReCommentNoti)
    }

    openCustomModalHandler("신청하시겠습니까?", "confirm", handler, true)
  }

  const cancelForProjectButtonHandler = (id: string) => {
    const handler = () => {
      removeMemberMutate.mutate(id)
    }

    openCustomModalHandler("신청을 취소하시겠습니까?", "confirm", handler)
  }

  return (
    project.recruit_status === false && (
      <>
        <article className="hidden md:block lg:block">
          {isWriter ? (
            <Button
              type="border"
              text="마감하기"
              handler={() => closeProjectButtonHandler(project.id)}
            />
          ) : isApplicantAuthenticated && isApplicantAuthenticated ? (
            <Button
              text="신청취소"
              handler={() => cancelForProjectButtonHandler(applyUser.id)}
            />
          ) : (
            <Button text="신청하기" handler={applyForProjectButtonHandler} />
          )}
        </article>
        <article className="z-10 bottom-0 fixed md:hidden lg:hidden">
          {isWriter ? (
            <Button
              type="border"
              text="마감하기"
              handler={() => closeProjectButtonHandler(project.id)}
            />
          ) : isApplicantAuthenticated && isApplicantAuthenticated ? (
            <Button
              text="신청취소"
              handler={() => cancelForProjectButtonHandler(applyUser.id)}
            />
          ) : (
            <Button text="신청하기" handler={applyForProjectButtonHandler} />
          )}
        </article>
      </>
    )
  )
}

export default FooterAuthButton
