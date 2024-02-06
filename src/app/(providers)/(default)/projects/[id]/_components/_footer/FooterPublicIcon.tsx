"use client"

import React, { useState } from "react"
import { Tables } from "@/types/supabase"
import { getProject } from "../../../api"
import PublicShareButton from "./PublicShareButton"
import BookmarkButton from "@/components/BookmarkButton"
import Image from "next/image"

interface Props {
  bookmarks: Tables<"bookmarks">[]
  project: Exclude<Awaited<ReturnType<typeof getProject>>, null>
  bookmarksCount: number
}

const FooterPublicIcon = ({ bookmarks, project, bookmarksCount }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const openModalClickHandler = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <span className="flex ml-auto pr-2 lg:pr-5 items-center">
        <span className="pr-1">
          <BookmarkButton bookmarks={bookmarks} projectId={project.id} />
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
      {isOpenModal && <PublicShareButton project={project} />}
    </>
  )
}

export default FooterPublicIcon
