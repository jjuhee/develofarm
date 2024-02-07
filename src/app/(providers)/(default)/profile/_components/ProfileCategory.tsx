"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import useUserStore from "@/store/user"
import { useProfileStore } from "@/store/profile"

const ProfileCategory = () => {
  const userId = useUserStore((state) => state?.user?.id) as string
  const { id } = useProfileStore()
  const [activeLink, setActiveLink] = useState(`/profile/${userId}`)

  // 클릭된 링크를 기억하고 활성화 상태를 업데이트하는 함수
  const handleLinkClick = (link: string): void => {
    setActiveLink(link)
  }

  useEffect(() => {
    // 페이지가 로드될 때 한 번 실행되는 효과
    // 현재 경로를 기반으로 초기 activeLink 값을 설정
    setActiveLink(window.location.pathname)
  }, []) // 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  if (userId !== id) {
    return null
  }

  // 링크를 렌더링하는 함수
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
    <div className="flex gap-[50px] text-[21px] font-bold py-[30px]">
      {renderLink(`/profile/${userId}`, "내 프로필")}
      {renderLink(`/profile/${userId}/profileProject`, "내 프로젝트")}
      {renderLink(`/profile/${userId}/notification`, "알림")}
    </div>
  )
}

export default ProfileCategory
