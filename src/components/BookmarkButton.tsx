import React from "react"
import { MdBookmarkBorder, MdOutlineBookmark } from "react-icons/md"

interface Props {
  projectId: string
  currentUser: string | null
}

const BookmarkButton = ({ projectId, currentUser }: Props) => {
  return (
    <div className="cursor-pointer">
      {/* 조건부 렌더링 */}
      <MdBookmarkBorder size={30} />
      {/* <MdOutlineBookmark size={30} /> */}
    </div>
  )
}

export default BookmarkButton
