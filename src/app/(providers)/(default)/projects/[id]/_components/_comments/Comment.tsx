"use client"

import React, { useState } from "react"
import dayjs from "dayjs"
import Image from "next/image"
import { removeComment } from "../../api"
import useUserStore from "@/store/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCustomModal } from "@/hooks/useCustomModal"
import Spacer from "@/components/ui/Spacer"
import CommentEditForm from "./CommentEditForm"
import ReComments from "./ReComments"
import { TCommentsType } from "@/types/extendedType"

type Props = {
  comment: TCommentsType
}

const Comment = ({ comment }: Props) => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const { user } = useUserStore((state) => state)
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()
  const isWriter = user?.id === comment?.user_id

  const removeCommentMutate = useMutation({
    mutationFn: removeComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId: comment.project_id }],
      })
      openCustomModalHandler("댓글이 삭제되었습니다", "alert")
    },
    onError: (error) => {
      openCustomModalHandler(`Error: ${error}`, "alert")
    },
  })

  const toggleFormHandler = () => {
    setShowForm(!showForm)
  }

  const isDeleteClickHandler = (id: string) => {
    const handler = () => {
      removeCommentMutate.mutate(id)
    }

    openCustomModalHandler("정말로 삭제하시겠습니까?", "confirm", handler)
  }
  return (
    <article key={comment.id} className="mb-5 px-3">
      <Image
        width={48}
        height={48}
        src={`${comment.user?.avatar_url}`}
        alt="댓글 작성자 이미지"
        className="rounded-full object-cover inline-block mr-3"
      />
      <span className="mr-3 pl-2 font-semibold text-xl">
        {comment.user?.user_nickname}
      </span>
      {comment.created_at === comment.updated_at ? (
        <span className="text-base">
          {dayjs(comment.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      ) : (
        <>
          <span className="text-base">
            {dayjs(comment.updated_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
          <span className="ml-2 text-base">(수정됨)</span>
        </>
      )}

      <div className="flex flex-col pl-14 pb-5 min-h-28 border-b-2">
        {isEditMode ? (
          <CommentEditForm
            commentId={comment.id}
            projectId={comment.project_id}
            commentContent={comment.content}
            setIsEditMode={setIsEditMode}
          />
        ) : comment.del_yn === true ? (
          <p className="h-auto font-semibold mb-3 ml-4 text-xl">
            삭제된 댓글입니다!
          </p>
        ) : (
          <p className="w-[550px] lg:w-[1100px] h-auto ml-4 mb-3 font-semibold whitespace-pre-line text-xl">
            {comment.content}
          </p>
        )}

        <section className="flex align-middle">
          <button
            className="text-left ml-[13px] min-w-[100px] text-[#666666] text-lg"
            onClick={toggleFormHandler}
          >
            {comment.comments &&
            (comment.comments as unknown as any[]).length > 0
              ? `${(comment.comments as unknown as any[]).length}개의 답글`
              : "댓글"}
          </button>
          {!comment.del_yn && isWriter && isEditMode === false && (
            <>
              <button
                className="ml-2 text-lg text-[#666666]"
                onClick={() => setIsEditMode(true)}
              >
                수정
              </button>
              <button
                className="ml-2 text-lg text-[#666666]"
                onClick={() => isDeleteClickHandler(comment.id)}
              >
                삭제
              </button>
            </>
          )}
        </section>
        <Spacer y={10} />
        {showForm && (
          <ReComments recomments={comment?.comments} comment={comment} />
        )}
      </div>
    </article>
  )
}

export default Comment
