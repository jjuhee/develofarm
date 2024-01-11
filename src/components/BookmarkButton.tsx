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
    // 이벤트 버블링 제거
    e.stopPropagation()

    // 로그인 됐을 때
    if (!currentUser) return

    // 로그인 되지 않았을 때
    if (isBookmarked()) {
      console.log("이미 추가됨")
      await removeBookmarks({ projectId, currentUser })
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] })
    } else {
      addMutate({ projectId, currentUser })
    }

    refetchBookmarks()
  }

  const isBookmarked = () => {
    return (
      bookmarks &&
      bookmarks.some((bookmark) => bookmark.project_id === projectId)
    )
  }

  return (
    <div className="cursor-pointer z-10" onClick={onClickHandler}>
      {isBookmarked() ? (
        <MdOutlineBookmark size={30} />
      ) : (
        <MdBookmarkBorder size={30} />
      )}
    </div>
  )
}

export default BookmarkButton
