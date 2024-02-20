"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { TablesInsert } from "@/types/supabase"
import useUserStore from "@/store/user"
import { setComment } from "../../api"
import useAddNotiMutate from "@/hooks/useAddNotiMutate"
import useLoginConfirmModal from "@/hooks/useLoginConfirmModal"
import { useCustomModal } from "@/hooks/useCustomModal"

type Props = {
  projectId: string
  commentUserId: string
  recommentId?: string | null
  type: "comment" | "recomment"
}

const CommentForm = ({
  projectId,
  commentUserId,
  recommentId,
  type,
}: Props) => {
  const [content, setContent] = useState<string>("")

  const queryClient = useQueryClient()
  const { user } = useUserStore((state) => state)
  const addNotiMutate = useAddNotiMutate()
  const openLoginConfirmModal = useLoginConfirmModal()
  const { openCustomModalHandler } = useCustomModal()

  const AddCommentMutate = useMutation({
    mutationFn: setComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId }],
      })
      setContent("")
    },
    onError: (error) => {
      openCustomModalHandler(`Error: ${error}`, "alert")
    },
  })

  const onSubmitHandler: React.FormEventHandler = (e) => {
    e.preventDefault()

    if (!user) return openLoginConfirmModal()

    if (content.trim() === "") {
      alert("댓글을 입력해주세요!")
      return false
    }

    if (type === "comment") {
      const newComment: TablesInsert<"comments"> = {
        project_id: projectId,
        user_id: user.id as string,
        content,
      }
      AddCommentMutate.mutate(newComment)

      if (commentUserId != user.id) {
        const newCommentNoti = {
          project_id: projectId,
          receiver_id: commentUserId,
          type: "comment",
          sender_nickname: user?.nickName as string,
        }
        addNotiMutate(newCommentNoti)
      }
    } else if (type === "recomment") {
      const newComment: TablesInsert<"comments"> = {
        project_id: projectId,
        user_id: user.id as string,
        content,
        comment_id: recommentId,
      }
      AddCommentMutate.mutate(newComment)

      if (commentUserId != user.id) {
        const newReCommentNoti = {
          project_id: projectId,
          receiver_id: commentUserId,
          type: "recomment",
          sender_nickname: user?.nickName as string,
        }
        addNotiMutate(newReCommentNoti)
      }
    }
  }

  return (
    <form
      className="flex flex-col border border-[#2D2D2D] rounded-2xl p-5 mb-5 text-xl"
      onSubmit={onSubmitHandler}
    >
      <textarea
        placeholder="댓글 내용을 입력하세요."
        maxLength={300}
        className="outline-none resize-none whitespace-pre-line placeholder:text-[#00000099] placeholder:text-opacity-60 scrollbar"
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
      />
      <button className="border-[3px] font-semibold border-[#A6A6A6] px-6 py-2 ml-auto rounded-lg hover:bg-[#A6A6A6] hover:text-[#fff] transition duration-300 ease-in-out">
        댓글 쓰기
      </button>
    </form>
  )
}

export default CommentForm
