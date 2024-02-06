import React from "react"
import Spacer from "@/components/ui/Spacer"
import ReComment from "./ReComment"
import CommentForm from "./CommentForm"
import { TCommentsType, TReCommentsType } from "@/types/extendedType"

type Props = {
  recomments: TReCommentsType
  comment: TCommentsType
}

const ReComments = ({ recomments, comment }: Props) => {
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
      <Spacer y={10} />
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
