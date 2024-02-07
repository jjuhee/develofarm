"use client"

import useUserStore from "@/store/user"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const TabNav = () => {
  const { user } = useUserStore((state) => state)

  const pathname = usePathname()

  if (pathname === "/write") return null

  return (
    <div className="fixed z-10 items-center bottom-0 w-full h-[55px] shadow-md shadow-gray-300 bg-white block lg:hidden">
      <ul className="flex w-full h-full justify-around items-center">
        <Link href={"/"} className="flex flex-col items-center justify-center">
          <Image src={"/icons/home.png"} alt="home" width={20} height={17} />
          <p className="text-[10px] font-semibold">홈</p>
        </Link>
        <Link
          href={"/projects"}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={"/icons/navi_projects.png"}
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
            src={"/icons/navi_members.png"}
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
            src={"/icons/navi_profile.png"}
            alt="navi_profile"
            width={13}
            height={17}
          />
          <p className="text-[10px] font-semibold">프로필</p>
        </Link>
      </ul>
    </div>
  )
}

export default TabNav
