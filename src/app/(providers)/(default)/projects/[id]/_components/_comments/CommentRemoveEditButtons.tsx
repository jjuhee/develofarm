import useUserStore from "@/store/user"
import { Tables } from "@/types/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { removeComment } from "../../api"
import { useCustomModal } from "@/hooks/useCustomModal"

type Props = {
  comment: Tables<"comments">
}

const CommentRemoveEditButtons = ({ comment }: Props) => {
  const queryClient = useQueryClient()
  const { userId } = useUserStore()
  const isWriter = userId === comment.user_id
  const { openCustomModalHandler } = useCustomModal()

  /**
   *@ mutaion 댓글 삭제 후 확인창 띄워주고 삭제
   TODO: 목록으로 돌아갈때 캐시가 남아 지워주는 작업 필요 */
  const removeCommentMutate = useMutation({
    mutationFn: removeComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId: comment.project_id }],
      })
      openCustomModalHandler("댓글이 삭제되었습니다", "alert")
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
      removeCommentMutate.mutate(id)
    }
  }

  return (
    isWriter && (
      <>
        <button className="ml-5 text-sm">수정</button>
        <button
          className="ml-2 text-sm"
          onClick={() => isDeleteClickHandler(comment.id)}
        >
          삭제
        </button>
      </>
    )
  )
}

export default CommentRemoveEditButtons
