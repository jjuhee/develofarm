"use client"

import React, { useState } from "react"
import Image from "next/image"
import dayjs from "dayjs"
import { getComments, removeReComment } from "../../api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCustomModal } from "@/hooks/useCustomModal"
import CommentEditForm from "./CommentEditForm"

type Props = {
  recomment: Exclude<Awaited<ReturnType<typeof getComments>>, null>[number]
}

const ReComment = ({ recomment }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()

  /**
   *@ mutaion 댓글 삭제 후 확인창 띄워주고 삭제
   TODO: 목록으로 돌아갈때 캐시가 남아 지워주는 작업 필요 */
  const removeReCommentMutate = useMutation({
    mutationFn: removeReComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId: recomment.project_id }],
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
    const handler = () => {
      removeReCommentMutate.mutate(id)
    }

    openCustomModalHandler("정말로 삭제하시겠습니까?", "confirm", handler)
  }

  return (
    <>
      <article
        key={recomment.id}
        className="mb-3 bg-[#666666] bg-opacity-5 rounded-xl py-5 px-10 min-h-[205px]"
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
          <span className="text-xs">
            {dayjs(recomment.created_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        ) : (
          <>
            <span className="text-xs">
              {dayjs(recomment.updated_at).format("YYYY-MM-DD HH:mm:ss")}
            </span>
            <span className="ml-2 text-xs">(수정됨)</span>
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
          <p className="ml-[62px] w-auto min-h-12 h-auto font-semibold whitespace-pre">
            {recomment.content}
          </p>
        )}
        {isEditMode === false && (
          <article className="ml-[53px]">
            <button
              className="text-sm text-[#666666]"
              onClick={() => setIsEditMode(true)}
            >
              수정
            </button>
            <button
              className="ml-2 text-sm text-[#666666]"
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
