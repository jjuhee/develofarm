import React from "react"
import Spacer from "@/components/ui/Spacer"
import { getComments } from "../../api"
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
