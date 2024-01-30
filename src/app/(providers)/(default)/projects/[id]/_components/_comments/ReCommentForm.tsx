"use clienet"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { TablesInsert } from "@/types/supabase"
import useUserStore from "@/store/user"
import Spacer from "@/components/ui/Spacer"
import { getComments, removeComment, setComment } from "../../api"
import ReComments from "./ReComments"
import CommentRemoveButton from "./CommentRemoveButton"
import { useCustomModal } from "@/hooks/useCustomModal"

type Props = {
  comment: Exclude<Awaited<ReturnType<typeof getComments>>, null>[number]
}

const ReCommentForm = ({ comment }: Props) => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [content, setContent] = useState<string>("")
  const { userId } = useUserStore()
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()

  /**
   *@ funtion 대댓글 작성 폼 토글 기능 */
  const toggleFormHandler = () => {
    setShowForm(!showForm)
  }

  /**
   *@ mutation 댓글 등록 후 해당 게시물Id로 댓글 최신 목록 불러오기 */
  const AddReCommentMutate = useMutation({
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

    if (!userId)
      return openCustomModalHandler("로그인 후에 작성 가능 합니다!", "alert")

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

    AddReCommentMutate.mutate(newComment)
  }

  /**
   *@ mutaion 댓글 삭제 후 확인창 띄워주고 삭제
   TODO: 목록으로 돌아갈때 캐시가 남아 지워주는 작업 필요 */
  const removeCommentMutate = useMutation({
    mutationFn: removeComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId: comment?.project_id }],
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
      removeCommentMutate.mutate(id)
    }

    openCustomModalHandler("정말로 삭제하시겠습니까?", "confirm", handler)
  }

  return (
    <>
      <section className="flex align-middle">
        <button
          className="text-left min-w-[100px] font-semibold"
          onClick={toggleFormHandler}
        >
          {/* TODO: 댓글이 1000개 이상일경우 표시해주는 형식 바꿀 예정 */}
          {comment.comments && (comment.comments as unknown as any[]).length > 0
            ? `${(comment.comments as unknown as any[]).length}개의 답글`
            : "댓글"}
        </button>
        {!comment.del_yn && (
          <CommentRemoveButton
            comment={comment}
            handler={isDeleteClickHandler}
          />
        )}
      </section>
      <Spacer y={20} />
      {showForm && (
        <section>
          <Spacer y={10} />
          <ReComments recomments={comment.comments} />
          <form
            className="flex flex-col border border-slate-600 rounded-xl p-5 mb-5"
            onSubmit={onSubmitHandler}
          >
            <textarea
              className="outline-none resize-none rounded-lg"
              placeholder="댓글 내용을 입력하세요"
              maxLength={500}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="border border-neutral-600 px-6 py-2 ml-auto rounded-lg hover:bg-slate-900 hover:text-white transition delay-75 ease-in-out">
              댓글 작성
            </button>
          </form>
        </section>
      )}
    </>
  )
}

export default ReCommentForm
