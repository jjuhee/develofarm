"use client"

import React, { useState } from "react"
import Link from "next/link"
import useUserStore from "@/store/user"
import { useProfileStore } from "@/store/profile"

const ProfileCategory = () => {
  const userId = useUserStore((state) => state?.user?.id) as string
  const { id } = useProfileStore()
  const [activeLink, setActiveLink] = useState("")

  const handleLinkClick = (link: string): void => {
    setActiveLink(link)
  }

  if (userId !== id) {
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
    <div className="flex gap-[50px] text-[36px] font-bold pt-[30px]">
      {renderLink(`/profile/${userId}`, "내 프로필")}
      {renderLink(`/profile/${userId}/profileProject`, "내 프로젝트")}
      {renderLink(`/profile/${userId}/notification`, "알림")}
    </div>
  )
}

export default ProfileCategory
