import BookmarkButton from "@/components/BookmarkButton"
import useUserStore from "@/store/user"
import { Tables } from "@/types/supabase"
import React from "react"
import { IoShareSocialOutline } from "react-icons/io5"

interface Props {
  bookmarks: Tables<"bookmarks">[]
  projectId: string
  bookmarksCount: number
}

const FooterPublicIcon = ({ bookmarks, projectId, bookmarksCount }: Props) => {
  const userId = useUserStore((state) => state.userId)

  return (
    <>
      <span className="ml-auto pr-5">
        <span>
          <BookmarkButton
            currentUser={userId}
            bookmarks={bookmarks}
            projectId={projectId}
          />
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
