import { Tables } from "@/types/supabase"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import Image from "next/image"
import React, { useState } from "react"
import Spacer from "@/components/ui/Spacer"
import CommentForm from "./CommentForm"
import ReCommentForm from "./ReCommentForm"
import { getComments } from "../../api"

type Props = {
  project: Tables<"projects">
}

const Comments = ({ project }: Props) => {
  const [editCommentId, setEditCommentId] = useState<string | null>(null)

  /**
   *@ query 해당 게시물 id를 구분해 댓글 목록 조회 */
  const { data: comments, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments", { projectId: project.id }],
    queryFn: () => getComments(project.id),
  })

  if (commentsIsLoading) return <div>is Loading...</div>

  return (
    <>
      <section>
        {comments?.map((comment) => {
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
              {/* {editCommentId === comment.id ? ( */}
              {/* // <div> */}
              {/* 수정 폼 */}
              {/* <textarea
                  value={comment.content}
                  onChange={(e) => handleSaveEdit(comment.id, e.target.value)}
                />
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : ( */}
              {/* //     <button onClick={() => handleEditComment(comment.id)}>
            //       Edit
            //     </button>
            // )} */}
              <div className="flex flex-col pl-14 min-h-28 border-b-2">
                {comment.del_yn === true ? (
                  <div className="h-auto font-semibold">삭제된 댓글입니다!</div>
                ) : (
                  <div className="h-auto font-semibold">{comment.content}</div>
                )}
                <Spacer y={10} />
                {comment.user && <ReCommentForm comment={comment} />}
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
