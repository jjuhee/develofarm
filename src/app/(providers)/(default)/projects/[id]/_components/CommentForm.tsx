import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { setComment } from "../../api"
import { Tables, TablesInsert } from "@/types/supabase"
import useUserStore from "@/store/user"

const CommentForm = () => {
  const [content, setContent] = useState<string>("")
  const queryClient = useQueryClient()
  const TODAY = `${Date.now()}`
  const { user } = useUserStore()

  /**
   *@ query 게시물 삭제 후 확인창 띄워주고 목록으로 이동
   TODO: 목록으로 돌아갈때 캐시가 남아 지워주는 작업 필요 */
  const AddCommentMutate = useMutation({
    mutationFn: setComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments"],
      })
      alert("댓글이 추가되었습니다")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  useEffect(() => {}, [])

  const onSubmitHandler = () => {
    const newComment: TablesInsert<"comments"> = {
      updated_at: TODAY,
      created_at: TODAY,
      project_id: comment.project_id,
      user_id: user.id,
      content,
    }

    AddCommentMutate.mutate(newComment)
  }

  return (
    <form
      className="flex flex-col border border-slate-600 p-5"
      onSubmit={onSubmitHandler}
    >
      <textarea
        placeholder="댓글 내용을 입력하세요"
        maxLength={500}
        className="outline-none resize-none"
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
      />
      <button className="border-2 border-slate-900 px-3 py-2 ml-auto rounded-full hover:bg-slate-900 hover:text-white transition delay-150 ease-in-out font-semibold">
        댓글 쓰기
      </button>
    </form>
  )
}

export default CommentForm
