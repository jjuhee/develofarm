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

const Header = () => {
  const { user } = useUserStore((state) => state)
  const { setUrl } = useUrlStore((state) => state)
  const { selectCategory } = useCategoryStore((state) => state)
  const { setViewMemberModal, setMemberPosition } = useMembersStore(
    (state) => state,
  )

  const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false)

  const pathname = usePathname()
  const segment = useSelectedLayoutSegment()

  /** 로그인 및 로그아웃 커스텀 훅 */
  useSignInAndSignOut({ setIsAuthInitialized })

  useEffect(() => {
    setUrl(pathname)
  }, [pathname])

  /** 인재풀 카테고리 선택 시 초기화 핸들러 */
  const onClickMemberCategoryHandler = () => {
    selectCategory("전체보기")
    setViewMemberModal(false)
    setMemberPosition(null)
  }

  return (
    <div
      className={`w-full bg-white shadow-lg shadow-gray-100 ${
        pathname === "/" ? "block" : "hidden"
      } lg:block`}
    >
      <div className="flex justify-between items-center max-w-[1250px] h-[96px] my-0 mx-auto px-2 ">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" width={200} height={30} />
        </Link>
        <nav className="flex items-center gap-5">
          <Link
            href={"/projects"}
            className={`text-black text-[18px] ${
              segment === "projects"
                ? "font-bold border-b-2 border-b-main-lime"
                : "font-medium"
            }`}
          >
            프로젝트 구인
          </Link>
          <Link
            href={"/members"}
            className={`text-black text-[18px] ${
              segment === "members"
                ? "font-bold border-b-2 border-b-main-lime"
                : "font-medium"
            }`}
            onClick={onClickMemberCategoryHandler}
          >
            인재풀
          </Link>
        </nav>

        <HeaderNav user={user!} isAuthInitialized={isAuthInitialized} />
      </div>
    </div>
  )
}

export default Header
