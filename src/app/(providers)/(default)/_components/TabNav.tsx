"use client"

import useUserStore from "@/store/user"
import Image from "next/image"
import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"
import React from "react"

const TabNav = () => {
  const { user } = useUserStore((state) => state)

  const segments = useSelectedLayoutSegments()
  const includedSegments = (path: string) => segments.includes(path)

  if (includedSegments("write")) return null

  return (
    <nav className="fixed z-10 items-center bottom-0 w-full h-[55px] shadow-md shadow-gray-300 bg-white block md:hidden">
      <ul className="flex w-full h-full justify-around items-center">
        <Link href={"/"} className="flex flex-col items-center justify-center">
          <Image
            src={
              includedSegments("(home)")
                ? "/icons/navi_active_home.png"
                : "/icons/navi_home.png"
            }
            alt="home"
            width={20}
            height={17}
          />
          <p className="text-[10px] font-semibold">홈</p>
        </Link>
        <Link
          href={"/projects"}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={
              includedSegments("projects")
                ? "/icons/navi_active_projects.png"
                : "/icons/navi_projects.png"
            }
            alt="navi_projects"
            width={20}
            height={17}
          />
          <p className="text-[10px] font-semibold">구인글</p>
        </Link>
        <Link
          href={"/members"}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={
              includedSegments("members")
                ? "/icons/navi_active_members.png"
                : "/icons/navi_members.png"
            }
            alt="navi_members"
            width={22}
            height={17}
          />
          <p className="text-[10px] font-semibold">인재풀</p>
        </Link>
        <Link
          href={`/profile/${user?.id}`}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={
              includedSegments("profile")
                ? "/icons/navi_active_profile.png"
                : "/icons/navi_profile.png"
            }
            alt="navi_profile"
            width={13}
            height={17}
          />
          <p className="text-[10px] font-semibold">프로필</p>
        </Link>
      </ul>
    </nav>
  )
}

export default TabNav
