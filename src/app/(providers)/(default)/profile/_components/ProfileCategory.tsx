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

  if (user !== id) {
    return null
  }

  const renderLink = (to: string, text: string) => (
    <Link href={to}>
      <div
        className={`${
          activeLink === to
            ? "text-black"
            : "text-gray-500 hover:text-black focus:text-black active:text-black"
        }`}
        onClick={() => handleLinkClick(to)}
      >
        {text}
      </div>
    </Link>
  )

  return (
    <div className="flex gap-[50px] text-[36px] font-bold py-[40px]">
      {renderLink(`/profile/${user}`, "내 프로필")}
      {renderLink(`/profile/${user}/profileProject`, "내 프로젝트")}
      {renderLink(`/profile/${user}/notification`, "알림")}
    </div>
  )
}

export default ProfileCategory
