"use client"

import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import Link from "next/link"
import React, { useState } from "react"
import { IoMdSearch } from "react-icons/io"
import { VscBell } from "react-icons/vsc"
import { supabaseForClient } from "@/supabase/supabase.client"
import useUserStore from "@/store/user"
import Image from "next/image"

const Header = () => {
  const { userId } = useUserStore((state) => state)
  const { selectCategory } = useCategoryStore((state) => state)
  const { setViewMemberModal, setMemberPosition } = useMembersStore(
    (state) => state,
  )

  const [isLoggedOut, setIsLoggedOut] = useState(false)

  const onClickMemberCategoryHandler = () => {
    selectCategory("전체보기")
    setViewMemberModal(false)
    setMemberPosition(null)
  }

  const [showTooltip, setShowTooltip] = useState(false)

  const onHandleClick = (event: React.MouseEvent) => {
    // 툴팁 표시 상태를 변경
    setShowTooltip(!showTooltip)
  }
  const [isAlarmData, setIsAlarmData] = useState<any>()
  const client = supabaseForClient

  const channelA = client
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "projects",
      },
      (payload) => setIsAlarmData(payload),
    )
    .subscribe()

  const onLogoutHandler = () => {
    //-- 이 부분은 주석이 있어야만 정상적으로 수행되는 코드 입니다.

    // localStorage.removeItem('keywords');
    supabaseForClient.auth.signOut()
    setIsLoggedOut(true)
    alert("로그아웃이 되었습니다")
  }

  return (
    <div className="flex w-full bg-white shadow-lg shadow-gray-200">
      <div className="flex justify-between items-center w-[1250px] h-[96px] my-0 mx-auto px-2 ">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" width={200} height={30} />
        </Link>
        <nav className="flex items-center gap-5">
          <Link
            href={"/projects"}
            className="text-black text-[18px] font-[500]"
          >
            프로젝트 구인
          </Link>
          <Link
            href={"/members"}
            className="text-black text-[18px] font-[500]"
            onClick={onClickMemberCategoryHandler}
          >
            인재풀
          </Link>
        </nav>
        <nav className="flex items-center  gap-4">
          <Link href={"/search"} className="text-lg">
            <IoMdSearch />
          </Link>
          {!isLoggedOut ? (
            <span>
              <button onClick={onLogoutHandler}>로그아웃</button>
            </span>
          ) : (
            <Link href={"/signin"}>통합로그인</Link>
          )}

          <span
            className={`text-md hover:cursor-pointer ${
              showTooltip ? "show" : ""
            }`}
            onClick={onHandleClick}
          >
            <VscBell />
            {showTooltip && (
              <div className="tooltip">
                {isAlarmData
                  ? "새로운 프로젝트가 생겼어요!"
                  : "알림이 없습니다"}
              </div>
            )}
          </span>
          <Link href={`/profile/${userId}`}>마이페이지</Link>
        </nav>
      </div>
    </div>
  )
}

export default Header
