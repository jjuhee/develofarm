"use client"

import { getComments } from "../../api"
import React from "react"
import Image from "next/image"
import dayjs from "dayjs"

type Props = {
  recomments: Exclude<
    Awaited<ReturnType<typeof getComments>>,
    null
  >[number]["comments"]
}

const ReComments = ({ recomments }: Props) => {
  return (
    <div>
      {(recomments as unknown as any[])?.map((recomment) => {
        return (
          <div key={recomment.id} className="mb-3">
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
            {/* <CommentRemoveEditButtons comment={reComment} /> */}
            <div className="flex flex-col pl-14 min-h-28 border-b-2">
              <div className="h-auto font-semibold">{recomment.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReComments
