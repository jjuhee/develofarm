import { Tables } from "@/types/supabase"
import Image from "next/image"
import React from "react"

type Props = {
  project: Tables<"projects">
  user: Tables<"users">
  isWriter: boolean
}

const Comments = ({ project, user, isWriter }: Props) => {
  return (
    <>
      <section className="">
        <div className="border-2 border-yellow-600">
          <Image
            width={48}
            height={48}
            src={`${user.avatar_url}`}
            alt="작성자 이미지"
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="mr-2">{user.user_nickname}</span>
          {/* <span className="text-sm">{TODAY.toLocaleString()}</span> */}
          <div>댓글내용</div>
          <span>
            <button>대댓글</button>
          </span>
        </div>
      </section>
      <section>
        <textarea placeholder="댓글 내용을 입력하세요" />
        <button className="hover:bg-violet-600 hover:text-white">
          댓글 등록하기
        </button>
      </section>
    </>
  )
}

export default Comments
