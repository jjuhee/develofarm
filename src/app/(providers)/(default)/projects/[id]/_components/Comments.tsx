import { Tables } from "@/types/supabase"
import formatDate from "@/utils/formatDate"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import Image from "next/image"
import React, { SetStateAction, useEffect, useState } from "react"
import { getComments } from "../../api"
import { getUsers } from "@/app/(providers)/api"

type Props = {
  project: Tables<"projects">
  user: Tables<"users">
  isWriter: boolean
}

type Comments = {
  formattedData: Tables<"comments">
}

const Comments = ({ project, user, isWriter }: Props) => {
  const [commentData, setCommentData] = useState<Comments[]>([])
  const { data: comments, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments", project.id],
    queryFn: () => getComments(project.id),
  })

  const { data: users, isLoading: usersIsLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  })

  const usersId = users?.map((user) => user.id)

  // const commentWriter = comments?.filter(
  //   (comment) => comment.user_id === usersId,
  // )
  console.log(usersId)

  console.log(comments?.map((comment) => comment.id))
  // useEffect(() => {
  //   if (comments) {
  //     const formattedData: Comments = comments.map((comment) => ({
  //       ...comment,
  //       created_at: dayjs(comment.created_at).format("YYYY-MM-DD HH:mm:ss"),
  //     }))
  //     setCommentData(formattedData)
  //   }
  // }, [comments])

  if (commentsIsLoading || !comments) return <div>is Loading...</div>

  return (
    <>
      <section className="">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="border-2 border-yellow-600">
              <Image
                width={48}
                height={48}
                src={`${user.avatar_url}`}
                alt="작성자 이미지"
                className="w-12 h-12 rounded-full object-cover inline-block"
              />
              <span className="mr-2 pl-3">{}</span>
              <span className="text-sm">
                {dayjs(comment.created_at).format("YYYY-MM-DD HH:mm:ss")}
              </span>
              <div>댓글내용</div>
              <span>
                <button>대댓글</button>
              </span>
            </div>
          )
        })}
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
