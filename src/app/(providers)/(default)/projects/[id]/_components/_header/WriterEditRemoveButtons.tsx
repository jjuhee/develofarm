import { Tables } from "@/types/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import React from "react"
import { removeProject } from "../../../api"
import { useRouter } from "next/navigation"
import { useCustomModal } from "@/hooks/useCustomModal"

type Props = {
  project: Tables<"projects">
  isWriter: boolean
}

const WriterEditRemoveButtons = ({ project, isWriter }: Props) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { openCustomModalHandler } = useCustomModal()

  /**
   *@ mutaion 게시물 삭제 후 확인창 띄워주고 목록으로 이동
   TODO: 목록으로 돌아갈때 캐시가 남아 지워주는 작업 필요 */
  const removeProjectMutate = useMutation({
    mutationFn: removeProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
      openCustomModalHandler("삭제되었습니다!", "alert")
      router.replace("/projects")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ function 받아온 id를 삭제 함수에 넣어서 확인창으로 검사 후 삭제 처리 */
  const isDeleteClickHandler = (id: string) => {
    const handler = () => {
      removeProjectMutate.mutate(id)
    }

    openCustomModalHandler("정말로 삭제하시겠습니까?", "confirm", handler)
  }

  return (
    // 작성자가 맞다면 수정/삭제 버튼 보여주기
    isWriter && (
      <>
        <li className="ml-auto">
          <Link href={`/write/${project.id}`}>수정</Link>
        </li>
        <li>
          <button onClick={() => isDeleteClickHandler(project.id)}>삭제</button>
        </li>
      </>
    )
  )
}

export default WriterEditRemoveButtons
