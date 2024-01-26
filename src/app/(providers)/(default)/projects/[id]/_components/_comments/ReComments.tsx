"use client"

import React from "react"
import Image from "next/image"
import dayjs from "dayjs"
import { getComments } from "../../api"

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
