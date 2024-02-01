import useUserStore from "@/store/user"
import { Tables } from "@/types/supabase"
import React from "react"

type Props = {
  comment: Tables<"comments">
  handler: (id: string) => void
}

const CommentRemoveButton = ({ comment, handler }: Props) => {
  const { user } = useUserStore((state) => state)
  const isWriter = user?.id === comment?.user_id

  return (
    isWriter && (
      <button className="ml-2 text-sm" onClick={() => handler(comment.id)}>
        삭제
      </button>
    )
  )
}

export default CommentRemoveButton
