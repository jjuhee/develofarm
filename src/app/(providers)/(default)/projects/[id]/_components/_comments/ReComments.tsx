"use client"

import React from "react"
import Image from "next/image"
import dayjs from "dayjs"
import { getComments, removeReComment } from "../../api"
import CommentRemoveButton from "./CommentRemoveButton"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCustomModal } from "@/hooks/useCustomModal"

type Props = {
  recomments: Exclude<
    Awaited<ReturnType<typeof getComments>>,
    null
  >[number]["comments"]
}

const ReComments = ({ recomments }: Props) => {
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()
  console.log(recomments, "데이터")
  /**
   *@ mutaion 댓글 삭제 후 확인창 띄워주고 삭제
   TODO: 목록으로 돌아갈때 캐시가 남아 지워주는 작업 필요 */
  const removeReCommentMutate = useMutation({
    mutationFn: removeReComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { commentId: recomments?.comment_id }],
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
    <div>
      {(recomments as unknown as any[])?.map((recomment) => {
        return (
          <div
            key={recomment.id}
            className="mb-3 bg-[#EEEEEE] rounded-xl py-5 px-10 h-[180px]"
          >
            <Image
              width={48}
              height={48}
              src={`${recomment.user?.avatar_url}`}
              alt="댓글 작성자 이미지"
              className="w-12 h-12 rounded-full object-cover inline-block"
            />
            <span className="mr-2 pl-2 font-semibold">
              {recomment.user?.user_nickname}
            </span>
            <span className="text-xs">
              {dayjs(recomment.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </span>
            {/* TODO: 대댓글 수정 삭제 예정 */}
            <CommentRemoveButton
              handler={() => isDeleteClickHandler(recomment.id)}
              comment={recomment}
            />
            <div className="flex flex-col pl-14 min-h-28 border-b-2">
              <p className="h-auto font-semibold whitespace-pre">
                {recomment.content}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReComments
