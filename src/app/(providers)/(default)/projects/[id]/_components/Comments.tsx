import { Tables } from "@/types/supabase"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import Image from "next/image"
import React from "react"
import { getComments } from "../../api"
import Spacer from "@/components/ui/Spacer"
import CommentForm from "./CommentForm"
import ReCommentForm from "./ReCommentForm"
import CommentRemoveEditButtons from "./CommentRemoveEditButtons"

type Props = {
  project: Tables<"projects">
}

const Comments = ({ project }: Props) => {
  /**
   *@ query 해당 게시물 id를 구분해 댓글 목록 조회 */
  const { data: comments, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments", { projectId: project.id }],
    queryFn: () => getComments(project.id),
  })

  if (commentsIsLoading || !comments) return <div>is Loading...</div>

  return (
    <>
      <section>
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="mb-3">
              <Image
                width={48}
                height={48}
                src={`${comment.user?.avatar_url}`}
                alt="댓글 작성자 이미지"
                className="w-12 h-12 rounded-full object-cover inline-block"
              />
              <span className="mr-2 pl-2 font-semibold">
                {comment.user?.user_nickname}
              </span>
              <span className="text-xs">
                {dayjs(comment.created_at).format("YYYY-MM-DD HH:mm:ss")}
              </span>
              <CommentRemoveEditButtons comment={comment} />
              <div className="flex flex-col pl-14 min-h-28 border-b-2">
                <div className="h-auto font-semibold">{comment.content}</div>
                <Spacer y={10} />
                {comment.user && <ReCommentForm />}
              </div>
            </div>
          )
        })}
        <Spacer y={30} />
        <CommentForm projectId={project.id} />
      </section>
    </>
  )
}

export default Comments
