"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useProfileStore } from "@/store/profile"

const ProfileCategory = () => {
  const [activeLink, setActiveLink] = useState("")

  const handleLinkClick = (link: string): void => {
    setActiveLink(link)
  }

  const { profile } = useProfileStore()

  return (
    <div className="flex gap-8 text-xl font-bold">
      <Link href={`/profile/${profile?.id}`}>
        <div
          className={`${
            activeLink === `/profile/${profile?.id}`
              ? "text-blue-500"
              : "hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
          }`}
          onClick={() => handleLinkClick(`/profile/${profile?.id}`)}
        >
          내프로필
        </div>
      </Link>
      <Link href={`/profile/${profile?.id}/bookmark`}>
        <div
          className={`${
            activeLink === `/profile/${profile?.id}/bookmark`
              ? "text-blue-500"
              : "hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
          }`}
          onClick={() => handleLinkClick(`/profile/${profile?.id}/bookmark`)}
        >
          찜한 프로젝트
        </div>
      </Link>
      <Link href={`/profile/${profile?.id}/notification`}>
        <div
          className={`${
            activeLink === `/profile/${profile?.id}/notification`
              ? "text-blue-500"
              : "hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
          }`}
          onClick={() =>
            handleLinkClick(`/profile/${profile?.id}/notification`)
          }
        >
          알림
        </div>
      </Link>
    </div>
  )
}

export default ProfileCategory
