import BookmarkButton from "@/components/BookmarkButton"
import { Tables } from "@/types/supabase"
import React from "react"
import { IoShareSocialOutline } from "react-icons/io5"

interface Props {
  bookmarks: Tables<"bookmarks">[]
  projectId: string
  bookmarksCount: number
}

const FooterPublicIcon = ({ bookmarks, projectId, bookmarksCount }: Props) => {
  return (
    <>
      <span className="flex ml-auto pr-5 items-center">
        <span className="pr-1">
          <BookmarkButton bookmarks={bookmarks} projectId={projectId} />
        </span>
        {bookmarksCount}
      </span>
      <span className="pr-5">
        <IoShareSocialOutline size={30} />
      </span>
    </>
  )
}

export default FooterPublicIcon
