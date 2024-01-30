"use client"

import BookmarkButton from "@/components/BookmarkButton"
import useUserStore from "@/store/user"
import { Tables } from "@/types/supabase"
import Image from "next/image"

import React, { useState } from "react"
import PublicShareButton from "./PublicShareButton"

interface Props {
  bookmarks: Tables<"bookmarks">[]
  projectId: string
  bookmarksCount: number
}

const FooterPublicIcon = ({ bookmarks, projectId, bookmarksCount }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const userId = useUserStore((state) => state.userId)

  const openModalClickHandler = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <span className="flex ml-auto pr-5 items-center">
        <span className="pr-1">
          <BookmarkButton
            currentUser={userId}
            bookmarks={bookmarks}
            projectId={projectId}
          />
        </span>
        {bookmarksCount}
      </span>
      <span
        className="relative pr-5 cursor-pointer"
        onClick={openModalClickHandler}
      >
        <Image
          width={24}
          height={24}
          src="/icons/shareIcon.png"
          alt="공유 아이콘"
          className="float-left mt-1 mr-2"
        />
      </span>
      {isOpenModal && <PublicShareButton />}
    </>
  )
}

export default FooterPublicIcon
