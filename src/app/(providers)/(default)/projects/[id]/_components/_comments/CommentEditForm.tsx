"use client"

import React, { useState } from "react"
import { editComment, getComments } from "../../api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCustomModal } from "@/hooks/useCustomModal"
import dayjs from "dayjs"

type Props = {
  projectId: string
  commentId: string
  commentContent: string
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
  type?: string
}

const CommentEditForm = ({
  commentId,
  commentContent,
  projectId,
  setIsEditMode,
  type,
}: Props) => {
  const [content, setContent] = useState<string>(commentContent)
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()

  const updateCommentMutate = useMutation({
    mutationFn: editComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId }],
      })

      setIsEditMode(false)
    },
    onError: (error) => {
      openCustomModalHandler(`Error: ${error}`, "alert")
    },
  })

  const editCommentClickHandler = (id: string) => {
    const handler = () => {
      const updated_at = dayjs(new Date()).toString()

      updateCommentMutate.mutate({ id, content, updated_at })
    }

    openCustomModalHandler("수정을 진행하시겠습니까?", "confirm", handler)
  }

  return (
    <form
      className={`${
        type === "recomment" ? "ml-[60px]" : "relative flex flex-col mb-3"
      }`}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={250}
        className={`{${
          type === "recomment"
            ? "ml-[60px] p-2 outline-none h-auto resize-none w-[979px] border border-[#2D2D2D] rounded-2xl scrollbar-none"
            : "outline-none h-auto resize-none border border-[#2D2D2D] rounded-2xl p-5 scrollbar-none"
        }`}
      />
      <div
        className={`${
          type === "recomment" ? "absolute" : "absolute ml-[1080px] mt-[110px]"
        }`}
      >
        <button
          type="button"
          className="ml-auto mr-2 text-[#666666] text-sm"
          onClick={() => editCommentClickHandler(commentId)}
        >
          수정
        </button>
        <button
          type="button"
          className="text-[#666666] text-sm"
          onClick={() => setIsEditMode(false)}
        >
          취소
        </button>
      </div>
    </form>
  )
}

export default CommentEditForm
