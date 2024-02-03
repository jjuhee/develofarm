import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { TablesInsert } from "@/types/supabase"
import useUserStore from "@/store/user"
import { setComment } from "../../api"
import { useCustomModal } from "@/hooks/useCustomModal"
import useAddNotiMutate from "@/hooks/useAddNotiMutate"

type Props = {
  projectId: string
  projectUserId: string
}

const CommentForm = ({ projectId, projectUserId }: Props) => {
  const [content, setContent] = useState<string>("")

  const queryClient = useQueryClient()
  const { user } = useUserStore((state) => state)
  const { openCustomModalHandler } = useCustomModal()
  const addNotiMutate = useAddNotiMutate()

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

    if (!user)
      return openCustomModalHandler("로그인 후에 작성 가능 합니다!", "alert")

    if (content.trim() === "") {
      alert("댓글을 입력해주세요!")
      return false
    }

    const newComment: TablesInsert<"comments"> = {
      project_id: projectId,
      user_id: user.id,
      content,
    }

    AddCommentMutate.mutate(newComment)

    if (projectUserId !== user.id) {
      const newCommentNoti = {
        project_id: projectId,
        receiver_id: projectUserId,
        type: "comment",
        sender_nickname: user?.nickName as string,
      }
      addNotiMutate(newCommentNoti)
    }
  }

  return (
    <form
      className="flex flex-col border border-slate-600 rounded-2xl p-5"
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
      <button className="border border-neutral-600 px-6 py-2 ml-auto rounded-lg hover:bg-slate-900 hover:text-white transition delay-75 ease-in-out">
        댓글 쓰기
      </button>
    </form>
  )
}

export default CommentForm
