import { Tables } from "@/types/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import React from "react"
import { removeProject } from "../../api"
import { useRouter } from "next/navigation"

type Props = {
  project: Tables<"projects">
}

const WriterEditRemoveButtons = ({ project }: Props) => {
  /**
   *@ param1 현재 로그인한 유저 정보를 담은 변수
   *@ param2 글 작성자가 현재 로그인한 유저랑 같은지 판별하는 변수*/
  const currentUser = localStorage.getItem("sb-aksbymviolrkiainilpq-auth-token")
    ? JSON.parse(localStorage.getItem("sb-aksbymviolrkiainilpq-auth-token")!)
    : null
  const isWriter = currentUser?.user?.id === project.user_id
  const queryClient = useQueryClient()
  const router = useRouter()

  /**
   *@ query 게시물 삭제 후 확인창 띄워주고 목록으로 이동 */
  const deleteProjectMutate = useMutation({
    mutationFn: removeProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
      alert("게시물이 삭제되었습니다!")
      router.replace("/projects")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ function 받아온 id를 삭제 함수에 넣어서 확인창으로 검사 후 삭제 처리 */
  const isDeleteClickHandler = (id: string) => {
    const isDelCheck = window.confirm("정말로 삭제하시겠습니까?")
    if (isDelCheck) {
      deleteProjectMutate.mutate(id)
    }
  }

  return (
    // 작성자가 맞다면 수정/삭제 버튼 보여주기
    isWriter && (
      <>
        <li className="ml-auto">
          <Link href="/update">수정</Link>
        </li>
        <li>
          <button onClick={() => isDeleteClickHandler(project.id)}>삭제</button>
        </li>
      </>
    )
  )
}

export default WriterEditRemoveButtons
