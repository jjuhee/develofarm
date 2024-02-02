import { Tables, TablesInsert } from "@/types/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import useUserStore from "@/store/user"
import {
  closeProject,
  getApplicationUser,
  removeProjectInMember,
  setMember,
} from "../../api"
import { useCustomModal } from "@/hooks/useCustomModal"
import Button from "@/components/ui/Button"
import { getProject } from "../../../api"

type Props = {
  project: Exclude<Awaited<ReturnType<typeof getProject>>, null>
  isWriter: boolean
}

const FooterAuthButton = ({ project, isWriter }: Props) => {
  const queryClient = useQueryClient()
  const { user } = useUserStore((state) => state)
  const { openCustomModalHandler } = useCustomModal()

  /**
   *@ mutaion 게시물 마감 후 확인창 띄어주기
   TODO: 새로고침 후 반영되는 거 수정예정 */
  const closeProjectMutate = useMutation({
    mutationFn: closeProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["project", { projectId: project.id }],
      })

      openCustomModalHandler("마감되었습니다!", "alert")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ mutation 프로젝트 신청 후 해당 게시물Id로 최신 신청자 목록 불러오기 */
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
      console.log(error)
    },
  })

  /**
   *@ mutation 프로젝트 신청취소 후 해당 게시물Id로 최신 신청자 목록 불러오기 */
  const removeMemberMutate = useMutation({
    mutationFn: removeProjectInMember,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["applyUser", { projectId: project.id }],
      })
      openCustomModalHandler("신청이 취소되었습니다!", "alert")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ function 작성자가 게시물 모집완료 처리 */
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

  /**
   *@ query 해당 게시물 id를 구분해 댓글 목록 조회 */
  const { data: applyUser, isLoading: applyUserIsLoading } = useQuery({
    enabled: user !== null,
    queryKey: ["applyUser", { projectId: project.id }],
    queryFn: () => getApplicationUser(project.id, user?.id),
  })

  // 신청자가 맞는지 확인하는 변수
  const isApplicantAuthenticated =
    user?.id && applyUser?.user_id && user?.id === applyUser?.user_id

  if (applyUserIsLoading) return <div>is Loading...</div>

  /**
   *@ query 해당 유저 id를 구분해 프로젝트 신청하기 기능 */
  const applyForProjectButtonHandler = () => {
    if (!user) {
      return
    }

    const newMember: TablesInsert<"project_members"> = {
      project_id: project.id,
      user_id: user.id,
    }

    const handler = (message?: string) => {
      addMemberMutate.mutate({ ...newMember, appeal_message: message })
    }

    openCustomModalHandler("신청하시겠습니까?", "confirm", handler, true)
  }

  /**
   *@ query 신청자 목록 id를 프로젝트 신청취소 기능 */
  const cancelForProjectButtonHandler = (id: string) => {
    const handler = () => {
      removeMemberMutate.mutate(id)
    }

    openCustomModalHandler("신청을 취소하시겠습니까?", "confirm", handler)
  }

  return (
    // 프로젝트가 모집완료 상태가 아니고 로그인한 유저라면 보여주는 버튼
    project.recruit_status === false &&
    user?.id && (
      <>
        {/* 글 작성자 여부에 따른 버튼 */}
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
          <Button
            color={"main-lime"}
            text="신청하기"
            handler={applyForProjectButtonHandler}
          />
        )}
      </>
    )
  )
}

export default FooterAuthButton
