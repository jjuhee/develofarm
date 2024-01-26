import { Tables, TablesInsert } from "@/types/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React from "react"
import useUserStore from "@/store/user"
import { closeProject, getApplicationUser, setMember } from "../../api"
import { useCustomModal } from "@/hooks/useCustomModal"

type Props = {
  project: Tables<"projects">
  isWriter: boolean
}

const FooterAuthButton = ({ project, isWriter }: Props) => {
  const queryClient = useQueryClient()
  const { userId } = useUserStore()
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
      })
      openCustomModalHandler("신청이 완료되었습니다!", "alert")
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

    openCustomModalHandler("정말로 마감하시겠습니까?", "confirm", handler)
  }

  /**
   *@ query 해당 게시물 id를 구분해 댓글 목록 조회 */
  const { data: applyUser, isLoading: applyUserIsLoading } = useQuery({
    queryKey: ["applyUser", { projectId: project.id }],
    queryFn: () => getApplicationUser(project.id, userId),
  })

  // 신청자가 맞는지 확인하는 변수
  const isApplicantAuthenticated = userId === applyUser?.user_id

  if (applyUserIsLoading) return <div>is Loading...</div>

  const applyForProjectButtonHandler: React.FormEventHandler = (e) => {
    e.preventDefault()

    const newMember: TablesInsert<"project_members"> = {
      project_id: project.id,
      user_id: userId,
    }

    addMemberMutate.mutate(newMember)
  }

  return (
    // 프로젝트가 모집완료 상태가 아니라면 보여주는 버튼
    !project.recruit_status && (
      <>
        {/* 글 작성자 여부에 따른 버튼 */}
        {isWriter ? (
          <button
            className="px-4 py-2 border-2 rounded-3xl border-slate-600 font-semibold hover:bg-slate-900 hover:text-white transition delay-150 ease-in-out"
            onClick={() => closeProjectButtonHandler(project.id)}
          >
            마감하기
          </button>
        ) : isApplicantAuthenticated ? (
          <button
            disabled
            className="px-4 py-2 border-2 rounded-3xl bg-slate-900 font-semibold text-white"
          >
            신청완료
          </button>
        ) : (
          <button
            className="px-4 py-2 border-2 rounded-3xl border-slate-600 font-semibold hover:bg-slate-900 hover:text-white transition delay-150 ease-in-out"
            onClick={applyForProjectButtonHandler}
          >
            신청하기
          </button>
        )}
      </>
    )
  )
}

export default FooterAuthButton
