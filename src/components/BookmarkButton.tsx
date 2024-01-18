import React from "react"
import {
  removeBookmarks,
  setBookmarks,
} from "@/app/(providers)/(default)/projects/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MdBookmarkBorder, MdOutlineBookmark } from "react-icons/md"
import type { Tables } from "@/types/supabase"
import { useRouter } from "next/navigation"
import { useCustomModal } from "@/hooks/useCustomModal"

interface Props {
  projectId: string
  currentUser: string
  bookmarks: Tables<"bookmarks">[]
}

const BookmarkButton = ({ projectId, currentUser, bookmarks }: Props) => {
  const queryClient = useQueryClient()

  const router = useRouter()

  const { openCustomModalHandler } = useCustomModal()

  const { mutate: addMutate } = useMutation({
    mutationFn: setBookmarks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
    },
  })

  const handler = () => {
    router.push("/signin")
  }

  const onClickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    /** 로그인 되지 않았을 때 */
    if (!currentUser) {
      openCustomModalHandler(
        `로그인이 필요합니다.
        로그인 페이지로 이동하시겠습니까?`,
        "confirm",
        handler,
      )
    }

    /** 로그인 됐을 때 */
    if (isBookmarked) {
      /** 이미 추가 됐을 경우 */
      await removeBookmarks({ projectId, currentUser })
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
    } else {
      /** 추가되어 있지 않을 경우 새로 추가 */
      addMutate({ projectId, currentUser })
    }
  }

  const isBookmarked =
    bookmarks && bookmarks.some((bookmark) => bookmark.project_id === projectId)

  return (
    <div className="cursor-pointer z-10 text-gray-400" onClick={onClickHandler}>
      {isBookmarked ? (
        <MdOutlineBookmark size={35} />
      ) : (
        <MdBookmarkBorder size={35} />
      )}
    </div>
  )
}

export default BookmarkButton
