import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { TablesInsert } from "@/types/supabase"
import useUserStore from "@/store/user"
import Spacer from "@/components/ui/Spacer"
import { getComments, setComment } from "../../api"
import { useCustomModal } from "@/hooks/useCustomModal"
import useAddNotiMutate from "@/hooks/useAddNotiMutate"
import ReComment from "./ReComment"
import CommentForm from "./CommentForm"

type Props = {
  recomments: Exclude<
    Awaited<ReturnType<typeof getComments>>,
    null
  >[number]["comments"]
  comment: Exclude<Awaited<ReturnType<typeof getComments>>, null>[number]
}

const ReComments = ({ recomments, comment }: Props) => {
  const [content, setContent] = useState<string>("")
  const { user } = useUserStore((state) => state)
  const queryClient = useQueryClient()
  const { openCustomModalHandler } = useCustomModal()
  const addNotiMutate = useAddNotiMutate()

  /**
   *@ mutation 댓글 등록 후 해당 게시물Id로 댓글 최신 목록 불러오기 */
  const AddReCommentMutate = useMutation({
    mutationFn: setComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["comments", { projectId: recomments?.project_id }],
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

    if (!user)
      return openCustomModalHandler("로그인 후에 작성 가능 합니다!", "alert")

    if (content.trim() === "") {
      alert("댓글을 입력해주세요!")
      return false
    }

    const newComment: TablesInsert<"comments"> = {
      project_id: recomments?.project_id as string,
      comment_id: recomments?.id,
      user_id: user.id,
      content,
    }

    AddReCommentMutate.mutate(newComment)
  }

  return (
    <section>
      <Spacer y={10} />
      <article>
        {(recomments as unknown as any[])?.map((recomment) => {
          return (
            recomment && <ReComment key={recomment.id} recomment={recomment} />
          )
        })}
      </article>
      <CommentForm
        projectId={comment.project_id}
        commentUserId={comment.user_id}
        recommentId={comment.id}
        type="recomment"
      />
    </section>
  )
}

export default ReComments
