"use client"

import React, { useState } from "react"
import Link from "next/link"
import useUserStore from "@/store/user"
import { useProfileStore } from "@/store/profile"

const ProfileCategory = () => {
  const { user } = useUserStore()
  const { id } = useProfileStore()
  const [activeLink, setActiveLink] = useState("")

  const handleLinkClick = (link: string): void => {
    setActiveLink(link)
  }

  const profileId = user === id

  return profileId ? (
    <div className="flex gap-8 text-xl font-bold">
      <Link href={`/profile/${user}`}>
        <div
          className={`${
            activeLink === `/profile/${user}`
              ? "text-blue-500"
              : "hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
          }`}
          onClick={() => handleLinkClick(`/profile/${user}`)}
        >
          내 프로필
        </div>
      </Link>
      <Link href={`/profile/${user}/profileProject`}>
        <div
          className={`${
            activeLink === `/profile/${user}/profileProject`
              ? "text-blue-500"
              : "hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
          }`}
          onClick={() => handleLinkClick(`/profile/${user}/profileProjects`)}
        >
          내 프로젝트
        </div>
      </Link>
      <Link href={`/profile/${user}/notification`}>
        <div
          className={`${
            activeLink === `/profile/${user}/notification`
              ? "text-blue-500"
              : "hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
          }`}
          onClick={() => handleLinkClick(`/profile/${user}/notification`)}
        >
          알림
        </div>
      </Link>
    </div>
  ) : null
}

export default ProfileCategory
