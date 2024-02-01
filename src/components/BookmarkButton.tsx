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
import useUserStore from "@/store/user"

interface Props {
  projectId: string
  bookmarks: Tables<"bookmarks">[]
}

const BookmarkButton = ({ projectId, bookmarks }: Props) => {
  const queryClient = useQueryClient()
  const { user: currentUser } = useUserStore((state) => state)

  const router = useRouter()

  const { openCustomModalHandler } = useCustomModal()

  const { mutate: addMutate } = useMutation({
    mutationFn: setBookmarks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
    },
  })

  /** 이미 북마크 된 것 판별 */
  const isBookmarked =
    bookmarks && bookmarks.some((bookmark) => bookmark.project_id === projectId)

  const onClickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    const moveToSigninPage = () => {
      router.push("/signin")
    }

    /** 로그인 되지 않았을 때 */
    if (!currentUser) {
      openCustomModalHandler(
        `로그인이 필요합니다.
        로그인 페이지로 이동하시겠습니까?`,
        "confirm",
        moveToSigninPage,
      )
    }

    /** 로그인 됐을 때 */
    /** 이미 추가 됐을 경우 */
    if (isBookmarked) {
      await removeBookmarks({ projectId, currentUser: currentUser?.id })
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
    } else if (currentUser) {
      /** 추가되어 있지 않을 경우 새로 추가 */
      addMutate({ projectId, currentUser: currentUser.id })
    }
  }

  return (
    <div className="cursor-pointer text-gray-400" onClick={onClickHandler}>
      {isBookmarked ? (
        <MdOutlineBookmark size={35} />
      ) : (
        <MdBookmarkBorder size={35} />
      )}
    </div>
  )
}

export default BookmarkButton
