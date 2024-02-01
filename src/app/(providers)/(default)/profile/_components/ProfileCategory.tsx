"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import useUserStore from "@/store/user"
import { useProfileStore } from "@/store/profile"

const ProfileCategory = () => {
  const userId = useUserStore((state) => state?.user?.id) as string
  const { id } = useProfileStore()
  const [activeLink, setActiveLink] = useState("")

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 활성 링크를 가져옵니다.
    const storedActiveLink = localStorage.getItem("activeLink")

    // 로컬 스토리지에 활성 링크가 설정되어 있지 않으면 기본 활성 링크를 설정합니다.
    if (!storedActiveLink) {
      const defaultLink = `/profile/${userId}`
      setActiveLink(defaultLink)
      localStorage.setItem("activeLink", defaultLink)
    } else {
      // 로컬 스토리지에서 활성 링크가 이미 설정되어 있으면 그 값을 사용합니다.
      setActiveLink(storedActiveLink)
    }
  }, [userId])

  // 링크 클릭 시 호출되는 함수로, 활성 링크를 설정하고 로컬 스토리지에 저장합니다.
  const handleLinkClick = (link: string): void => {
    setActiveLink(link)
    localStorage.setItem("activeLink", link)
  }

  // 사용자가 자신의 프로필을 보고 있지 않은 경우 컴포넌트를 렌더링하지 않습니다.
  if (userId !== id) {
    return null
  }

  // 링크를 렌더링하는 함수로, 현재 활성 링크에 따라 스타일이 변경됩니다.
  const renderLink = (to: string, text: string) => (
    <Link href={to} key={to}>
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
