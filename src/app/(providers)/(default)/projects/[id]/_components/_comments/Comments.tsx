import { Tables } from "@/types/supabase"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import React, { useState } from "react"
import Spacer from "@/components/ui/Spacer"
import CommentForm from "./CommentForm"
import { getComments } from "../../api"
import Comment from "./Comment"

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

  if (commentsIsLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Image src={"/images/load.gif"} alt="load" width={200} height={200} />
      </div>
    )

  return (
    <>
      <section>
        {comments?.map((comment) => {
          return <Comment key={comment.id} comment={comment} />
        })}
        <Spacer y={30} />
        <CommentForm
          projectId={project.id}
          commentUserId={project.user_id}
          type="comment"
        />
      </section>
    </>
  )
}

export default Comments
