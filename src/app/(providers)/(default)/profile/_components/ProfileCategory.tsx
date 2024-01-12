"use client"

import React, { useState } from "react"
import Link from "next/link"

const ProfileCategory = () => {
  const [activeLink, setActiveLink] = useState("")

  const handleLinkClick = (link: string): void => {
    setActiveLink(link)
  }

  return (
    <div className="flex gap-8 text-xl font-bold">
      <Link href="/profile">
        <div
          className={`${
            activeLink === "/profile"
              ? "text-blue-500"
              : "hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
          }`}
          onClick={() => handleLinkClick("/profile")}
        >
          내프로필
        </div>
      </Link>
      <Link href="/profile/bookmark">
        <div
          className={`${
            activeLink === "/profile/bookmark"
              ? "text-blue-500"
              : "hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
          }`}
          onClick={() => handleLinkClick("/profile/bookmark")}
        >
          찜한 프로젝트
        </div>
      </Link>
      <Link href="/profile/notification">
        <div
          className={`${
            activeLink === "/profile/notification"
              ? "text-blue-500"
              : "hover:text-blue-500 focus:text-blue-500 active:text-blue-500"
          }`}
          onClick={() => handleLinkClick("/profile/notification")}
        >
          알림
        </div>
      </Link>
    </div>
  )
}

export default ProfileCategory
