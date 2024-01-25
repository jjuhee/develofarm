import { Tables, TablesInsert } from "@/types/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React from "react"
import useUserStore from "@/store/user"
import { closeProject, getApplicatinUser, setMember } from "../../api"

type Props = {
  project: Tables<"projects">
  isWriter: boolean
}

const FooterAuthButton = ({ project, isWriter }: Props) => {
  const queryClient = useQueryClient()
  const { userId } = useUserStore()

  /**
   *@ mutaion 게시물 마감 후 확인창 띄어주기 */
  const closeProjectMutate = useMutation({
    mutationFn: closeProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["project", { projectId: project.id }],
      })
      alert("마감을 진행했습니다")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ mutation 댓글 등록 후 해당 게시물Id로 댓글 최신 목록 불러오기 */
  const addMemberMutate = useMutation({
    mutationFn: setMember,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["applyUser", { projectId: project.id }],
      })
      alert("신청이 완료되었습니다!")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ function 작성자가 게시물 모집완료 처리 */
  const closeProjectButtonHandler = (id: string) => {
    const isCloseCheck = window.confirm("정말로 마감 하시겠습니까?")
    if (isCloseCheck) {
      closeProjectMutate.mutate(id)
    }
  }

  /**
   *@ query 해당 게시물 id를 구분해 댓글 목록 조회 */
  const { data: applyUser, isLoading: applyUserIsLoading } = useQuery({
    queryKey: ["applyUser", { projectId: project.id }],
    queryFn: () => getApplicatinUser(project.id, userId),
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
