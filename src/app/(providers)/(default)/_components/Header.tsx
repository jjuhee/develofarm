"use client"

import React, { useEffect, useState } from "react"
import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import Link from "next/link"
import useUserStore from "@/store/user"
import Image from "next/image"
import { usePathname } from "next/navigation"
import useUrlStore from "@/store/url"
import { useSelectedLayoutSegment } from "next/navigation"
import HeaderNav from "./HeaderNav"
import useSignInAndSignOut from "@/hooks/useSignInAndSignOut"
import HeaderFrontNav from "./HeaderFrontNav"

const Header = () => {
  const { user } = useUserStore((state) => state)
  const { setUrl } = useUrlStore((state) => state)

  const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false)

  const pathname = usePathname()

  /** 로그인 및 로그아웃 커스텀 훅 */
  useSignInAndSignOut({ setIsAuthInitialized })

  useEffect(() => {
    setUrl(pathname)
  }, [pathname])

  return (
    <div
      className={`w-full bg-white shadow-lg shadow-gray-100 ${
        pathname === "/" ? "block" : "hidden"
      } lg:block`}
    >
      <div className="flex justify-between items-center max-w-[1250px] h-[60px] my-0 mx-auto px-2 ">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" width={168} height={20} />
        </Link>

        <HeaderFrontNav />

        <HeaderNav user={user!} isAuthInitialized={isAuthInitialized} />
      </div>
    </div>
  )
}

export default Header
