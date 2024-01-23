import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { TablesInsert } from "@/types/supabase"
import useUserStore from "@/store/user"
import { setComment } from "../../api"

type Props = {
  projectId: string
}

const CommentForm = ({ projectId }: Props) => {
  const [content, setContent] = useState<string>("")
  console.log("내용", content)

  const queryClient = useQueryClient()
  const { userId } = useUserStore()

  /**
   *@ mutation 댓글 등록 후 해당 게시물Id로 댓글 최신 목록 불러오기 */
  const AddCommentMutate = useMutation({
    mutationFn: setComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId }],
      })

      setContent("")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ function 버튼 누르면 입력한 폼 인자로 넣어서 댓글 추가하는 함수 실행 */
  const onSubmitHandler: React.FormEventHandler = (e) => {
    e.preventDefault()

    if (content.trim() === "") {
      alert("댓글을 입력해주세요!")
      return false
    }

    const newComment: TablesInsert<"comments"> = {
      project_id: projectId,
      user_id: userId,
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
        className="outline-none resize-none whitespace-pre-line"
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
