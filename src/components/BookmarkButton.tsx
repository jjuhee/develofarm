import {
  getBookmarks,
  removeBookmarks,
  setBookmarks,
} from "@/app/(providers)/(default)/projects/api"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import React from "react"
import { MdBookmarkBorder, MdOutlineBookmark } from "react-icons/md"

interface Props {
  projectId: string
  currentUser: string
}

const BookmarkButton = ({ projectId, currentUser }: Props) => {
  const queryClient = new QueryClient()

  const { mutate: addMutate } = useMutation({
    mutationFn: setBookmarks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
    },
  })

  const { data: bookmarks, refetch: refetchBookmarks } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  })

  const onClickHandler = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if (!currentUser) return

    // 로그인 됐을 때
    if (isBookmarked) {
      // 이미 추가 됐을 경우
      console.log("pass")
      await removeBookmarks({ projectId, currentUser })
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
    } else {
      // 추가되어 있지 않을 경우 새로 추가
      addMutate({ projectId, currentUser })
      refetchBookmarks()
    }
    refetchBookmarks()
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
