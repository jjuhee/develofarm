import React, { useState } from "react"
import dayjs from "dayjs"
import Image from "next/image"
import { getComments, removeComment } from "../../api"
import useUserStore from "@/store/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCustomModal } from "@/hooks/useCustomModal"
import Spacer from "@/components/ui/Spacer"
import CommentEditForm from "./CommentEditForm"
import ReComments from "./ReComments"

type Props = {
  comment: Exclude<Awaited<ReturnType<typeof getComments>>, null>[number]
}

const Comment = ({ comment }: Props) => {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const { user } = useUserStore((state) => state)
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()
  const isWriter = user?.id === comment?.user_id

  /**
   *@ mutaion 댓글 삭제 후 확인창 띄워주고 삭제
   TODO: 목록으로 돌아갈때 캐시가 남아 지워주는 작업 필요 */
  const removeCommentMutate = useMutation({
    mutationFn: removeComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId: comment.project_id }],
      })
      openCustomModalHandler("댓글이 삭제되었습니다", "alert")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  /**
   *@ funtion 대댓글 작성 폼 토글 기능 */
  const toggleFormHandler = () => {
    setShowForm(!showForm)
  }

  /**
   *@ function 받아온 id를 삭제 함수에 넣어서 확인창으로 검사 후 삭제 처리 */
  const isDeleteClickHandler = (id: string) => {
    const handler = () => {
      removeCommentMutate.mutate(id)
    }

    openCustomModalHandler("정말로 삭제하시겠습니까?", "confirm", handler)
  }
  return (
    <article key={comment.id} className="mb-3">
      <Image
        width={48}
        height={48}
        src={`${comment.user?.avatar_url}`}
        alt="댓글 작성자 이미지"
        className="rounded-full object-cover inline-block"
      />
      <span className="mr-2 pl-2 font-semibold">
        {comment.user?.user_nickname}
      </span>
      {comment.created_at === comment.updated_at ? (
        <span className="text-xs">
          {dayjs(comment.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      ) : (
        <>
          <span className="text-xs">
            {dayjs(comment.updated_at).format("YYYY-MM-DD HH:mm:ss")}
          </span>
          <span className="ml-2 text-xs">(수정됨)</span>
        </>
      )}

      <div className="flex flex-col pl-14 min-h-28 border-b-2">
        {isEditMode ? (
          <CommentEditForm
            commentId={comment.id}
            projectId={comment.project_id}
            commentContent={comment.content}
            setIsEditMode={setIsEditMode}
          />
        ) : comment.del_yn === true ? (
          <p className="h-auto font-semibold mb-3">삭제된 댓글입니다!</p>
        ) : (
          <p className="h-auto mb-3 font-semibold whitespace-pre">
            {comment.content}
          </p>
        )}

        <section className="flex align-middle">
          <button
            className="text-left min-w-[100px] text-[#666666] mr-2"
            onClick={toggleFormHandler}
          >
            {/* TODO: 댓글이 수가 많아질 경우 표시해주는 형식 바꿀 예정 */}
            {comment.comments &&
            (comment.comments as unknown as any[]).length > 0
              ? `${(comment.comments as unknown as any[]).length}개의 답글`
              : "댓글"}
          </button>
          {!comment.del_yn && isWriter && isEditMode === false && (
            <>
              <button
                className="ml-2 text-sm text-[#666666]"
                onClick={() => setIsEditMode(true)}
              >
                수정
              </button>
              <button
                className="ml-2 text-sm text-[#666666]"
                onClick={() => isDeleteClickHandler(comment.id)}
              >
                삭제
              </button>
            </>
          )}
        </section>
        <Spacer y={10} />
        {showForm && (
          <ReComments recomments={comment?.comments} comment={comment} />
        )}
      </div>
    </article>
  )
}

export default Comment
