"use clienet"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { TablesInsert } from "@/types/supabase"
import useUserStore from "@/store/user"
import Spacer from "@/components/ui/Spacer"
import { getComments, setComment } from "../../api"
import ReComments from "./ReComments"
import CommentRemoveButton from "./CommentRemoveButton"

type Props = {
  comment: Exclude<Awaited<ReturnType<typeof getComments>>, null>[number]
}

const ReCommentForm = ({ comment }: Props) => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [content, setContent] = useState<string>("")
  const { userId } = useUserStore()
  const queryClient = useQueryClient()

  /**
   *@ funtion 대댓글 작성 폼 토글 기능 */
  const toggleFormHandler = () => {
    setShowForm(!showForm)
  }

  /**
   *@ mutation 댓글 등록 후 해당 게시물Id로 댓글 최신 목록 불러오기 */
  const AddCommentMutate = useMutation({
    mutationFn: setComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId: comment.project_id }],
      })

      setContent("")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ function 버튼 누르면 입력한 폼 인자로 넣어서 댓글 추가하는 함수 실행 */
  const onSubmitHandler: React.FormEventHandler = (e) => {
    e.preventDefault()

    if (content.trim() === "") {
      alert("댓글을 입력해주세요!")
      return false
    }

    const newComment: TablesInsert<"comments"> = {
      project_id: comment.project_id,
      comment_id: comment.id,
      user_id: userId,
      content,
    }

    AddCommentMutate.mutate(newComment)
  }

  return (
    <>
      <div className="flex align-middle">
        <button
          className="text-left min-w-[100px] font-semibold"
          onClick={toggleFormHandler}
        >
          {/* TODO: 댓글이 1000개 이상일경우 표시해주는 형식 바꿀 예정 */}
          {comment.comments && (comment.comments as unknown as any[]).length > 0
            ? `${(comment.comments as unknown as any[]).length}개의 답글`
            : "댓글"}
        </button>
        {!comment.del_yn && <CommentRemoveButton comment={comment} />}
      </div>
      <Spacer y={20} />
      {showForm && (
        <div>
          <Spacer y={10} />
          <ReComments recomments={comment.comments} />
          <form
            className="flex flex-col border border-slate-600 p-5 mb-5"
            onSubmit={onSubmitHandler}
          >
            <textarea
              className="outline-none resize-none rounded-lg"
              placeholder="댓글 내용을 입력하세요"
              maxLength={500}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="border-2 border-slate-900 px-3 py-2 ml-auto rounded-full hover:bg-slate-900 hover:text-white transition delay-150 ease-in-out font-semibold">
              댓글 작성
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ReCommentForm
