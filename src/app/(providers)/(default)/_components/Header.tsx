"use client"

import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import Link from "next/link"
import React, { useEffect, useState } from "react"
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

  const onClickMemberCategoryHandler = () => {
    selectCategory("전체보기")
    setViewMemberModal(false)
    setMemberPosition(null)
  }

  const [showTooltip, setShowTooltip] = useState(false)

  const onHandleClick = (event: React.MouseEvent) => {
    setShowTooltip(!showTooltip)
  }

  const [isAlarmData, setIsAlarmData] = useState<{ [key: string]: any }>()
  const client = supabaseForClient

  //public schema의 projects 테이블을 구독, unmount시 구독취소
  useEffect(() => {
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
    return () => {
      channelA.unsubscribe()
    }
  })

  //로그아웃, 및 로그인/로그아웃 체크 및  관련 로직
  //TODO : 로그아웃시 바로 isLoggedOut이 true 값으로 변하지 않는것을 해결해야함
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(true)
  const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN as string
  const getAuthToken = localStorage.getItem(AUTH_TOKEN)
  useEffect(() => {
    if (getAuthToken) {
      setIsLoggedOut(false)
    }
  }, [isLoggedOut])

  console.log("리렌더링 ?", isLoggedOut)

  //로그아웃 함수
  const onLogoutHandler = () => {
    //-- 이 부분은 주석이 있어야만 정상적으로 수행되는 코드 입니다.
    // localStorage.removeItem('keywords');

    supabaseForClient.auth.signOut()
    setIsLoggedOut(true)
    alert("로그아웃이 되었습니다")
  }
  //END
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

          {/* isLoggedOut이 false 일때 로그인 상태 */}
          {!isLoggedOut ? (
            <>
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
              <span>
                <Link href={`/profile/${userId}`}>마이페이지</Link>
              </span>
              <span>
                <button onClick={onLogoutHandler}>로그아웃</button>
              </span>
            </>
          ) : (
            // isLoggedOut이 true 일때 로그인 상태

            <Link href={"/signin"}>통합로그인</Link>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Header
