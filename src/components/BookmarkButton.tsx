import React from "react"
import { MdBookmarkBorder, MdOutlineBookmark } from "react-icons/md"

const BookmarkButton = () => {
  return (
    <div className="">
      {/* 조건부 렌더링 */}
      {/* <MdBookmarkBorder size={30} /> */}
      <MdOutlineBookmark size={30} />
    </div>
  )
}

export default BookmarkButton
