"use client"

import { Tables } from "@/types/supabase"
import React from "react"
import { getReComments } from "../../api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import dayjs from "dayjs"

type Props = {
  comment: Tables<"comments">
}

const ReComments = ({ comment }: Props) => {
  /**
   *@ query 해당 게시물 id를 구분해 대댓글 목록 조회 */
  const { data: reComments, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["reComments", { commentId: comment.id }],
    queryFn: () => getReComments(comment.id),
    enabled: !!comment.id,
  })
  if (commentsIsLoading || !reComments) return <div>is Loading...</div>

  return (
    <div>
      {reComments.map((reComment) => {
        return (
          <div key={reComment.id} className="mb-3">
            <Image
              width={48}
              height={48}
              src={`${reComment.user?.avatar_url}`}
              alt="댓글 작성자 이미지"
              className="w-12 h-12 rounded-full object-cover inline-block"
            />
            <span className="mr-2 pl-2 font-semibold">
              {reComment.user?.user_nickname}
            </span>
            <span className="text-xs">
              {dayjs(reComment.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </span>
            {/* <CommentRemoveEditButtons comment={reComment} /> */}
            <div className="flex flex-col pl-14 min-h-28 border-b-2">
              <div className="h-auto font-semibold">{reComment.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReComments
