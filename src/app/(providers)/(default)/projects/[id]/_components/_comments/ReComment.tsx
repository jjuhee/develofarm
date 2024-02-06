"use client"

import React, { useState } from "react"
import Image from "next/image"
import dayjs from "dayjs"
import { removeReComment } from "../../api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCustomModal } from "@/hooks/useCustomModal"
import CommentEditForm from "./CommentEditForm"
import { TCommentsType } from "@/types/extendedType"

type Props = {
  recomment: TCommentsType
}

const ReComment = ({ recomment }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()

  const removeReCommentMutate = useMutation({
    mutationFn: removeReComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId: recomment.project_id }],
      })
      openCustomModalHandler("댓글이 삭제되었습니다", "alert")
    },
    onError: (error) => {
      openCustomModalHandler(`Error: ${error}`, "alert")
    },
  })

  const isDeleteClickHandler = (id: string) => {
    const handler = () => {
      removeReCommentMutate.mutate(id)
    }

    openCustomModalHandler("정말로 삭제하시겠습니까?", "confirm", handler)
  }

  return (
    <>
      <article
        key={recomment.id}
        className="mb-3 bg-[#666666] bg-opacity-5 rounded-xl py-8 px-10 w-[550px] lg:w-[1130px] min-h-[122px] text-xl"
      >
        <Image
          width={48}
          height={48}
          src={`${recomment.user?.avatar_url}`}
          alt="댓글 작성자 이미지"
          className="rounded-full object-cover inline-block"
        />
        <span className="mr-2 pl-2 font-semibold">
          {recomment.user?.user_nickname}
        </span>
        {recomment.created_at === recomment.updated_at ? (
          <span className="text-base">
            {dayjs(recomment.created_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        ) : (
          <>
            <span className="text-base">
              {dayjs(recomment.updated_at).format("YYYY-MM-DD HH:mm:ss")}
            </span>
            <span className="ml-2 text-base">(수정됨)</span>
          </>
        )}
        {isEditMode ? (
          <CommentEditForm
            commentId={recomment.id}
            projectId={recomment.project_id}
            commentContent={recomment.content}
            setIsEditMode={setIsEditMode}
            type="recomment"
          />
        ) : (
          <p className="w-[420px] lg:w-[1000px] ml-[62px] min-h-12 h-auto font-semibold text-xl whitespace-pre-line">
            {recomment.content}
          </p>
        )}
        {isEditMode === false && (
          <article className="ml-[63px] text-lg">
            <button
              className="text-[#666666]"
              onClick={() => setIsEditMode(true)}
            >
              수정
            </button>
            <button
              className="ml-2 text-[#666666]"
              onClick={() => isDeleteClickHandler(recomment.id)}
            >
              삭제
            </button>
          </article>
        )}
      </article>
    </>
  )
}

export default ReComment
