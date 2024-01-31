"use client"

import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { IoMdSearch } from "react-icons/io"
import { VscBell } from "react-icons/vsc"
import { supabaseForClient } from "@/supabase/supabase.client"
import useUserStore from "@/store/user"
import Image from "next/image"
import { GoPerson } from "react-icons/go"
import { LuFolder } from "react-icons/lu"
import { IoLogOutOutline } from "react-icons/io5"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"

const Header = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isImageActive, setIsImageActive] = useState<boolean>(false)
  const [isAlarmData, setIsAlarmData] = useState<{ [key: string]: any }>()
  const [isAuthIntialized, setIsAuthIntialized] = useState<boolean>(false)
  const { user, setUser } = useUserStore((state) => state)
  const { selectCategory } = useCategoryStore((state) => state)
  const { setViewMemberModal, setMemberPosition } = useMembersStore(
    (state) => state,
  )
  const dropdownRef = useRef<HTMLInputElement>(null)
  const client = supabaseForClient

  const onClickMemberCategoryHandler = () => {
    selectCategory("전체보기")
    setViewMemberModal(false)
    setMemberPosition(null)
  }

  const onAlarmHandleClick = () => {
    setShowTooltip(!showTooltip)
    setIsImageActive(false)
  }

  const onAvatarHandlerClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsImageActive((prev) => !prev)
    setShowTooltip(false)
  }

  //로그아웃 함수
  const onLogoutHandler = () => {
    //-- 이 부분은 주석이 있어야만 정상적으로 수행되는 코드 입니다.
    // localStorage.removeItem('keywords');

    supabaseForClient.auth.signOut()
  }

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

  // 로그아웃, 및 로그인/로그아웃 체크 및  관련 로직
  useEffect(() => {
    const subscription = supabaseForClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
          if (session?.user) {
            const userData = {
              id: session.user.id,
              nickName: session.user.user_metadata?.name as string,
              avatarUrl: session.user.user_metadata?.avatar_url,
              email: session.user.email as string,
              createdAt: session.user.email as string,
            }
            setUser(userData)
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null)
        }
        // 로그인이나 로그아웃 상태를 가지고 있을 경우
        setIsAuthIntialized(true)
      },
    )
    return () => {
      subscription.data.subscription.unsubscribe()
      console.log("unsubscribe!!")
    }
  }, [])

  useOnClickOutSide({
    ref: dropdownRef,
    handler: () => setIsImageActive(false),
  })

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

          {/* 유저가 로그인 중일 때 메뉴 숨기기 */}
          {isAuthIntialized ? (
            // user의 정보가 있을 때 프로필 메뉴 보여주기
            user ? (
              <>
                <span
                  className={`text-md hover:cursor-pointer ${
                    showTooltip ? "show" : ""
                  }`}
                  onClick={onAlarmHandleClick}
                >
                  <VscBell />
                  {showTooltip && (
                    <div className="relative flex">
                      <div className="flex-row w-[200px] left-[-100px] rounded-lg tooltip bg-white border border-gray-300 shadow-lg p-4 absolute top-3 z-50 ">
                        {isAlarmData ? (
                          <>
                            <div className=" text-[18px] border border-gray-200 rounded-xl p-2 hover hover:cursor-pointer hover:shadow-lg">
                              새로운 프로젝트가 생겼어요!
                            </div>
                          </>
                        ) : (
                          <div className="text-[18px] border border-gray-200 rounded-xl p-2 hover hover:cursor-pointer hover:shadow-lg">
                            알림이 없습니다
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </span>

                <div
                  className="rounded-full shadow-lg hover hover:cursor-pointer"
                  onClick={onAvatarHandlerClick}
                  ref={dropdownRef}
                >
                  <Image
                    className="rounded-full"
                    alt="이미지"
                    src={user.avatarUrl ? user.avatarUrl : ""}
                    width={36}
                    height={36}
                  />

                  {isImageActive && (
                    <div className="relative flex">
                      <div className="left-[-100px] flex-row w-[200px] rounded-lg tooltip bg-white border border-gray-300 shadow-lg  p-4 absolute top-2 z-50 ">
                        <>
                          <div>유저 이메일</div>
                          <div className="text-xs text-gray-400">
                            {user.email}
                          </div>
                          <Link href={`/profile/${user.id}`}>
                            <span className="flex items-center hover hover:cursor-pointer hover:border-gray-300 hover:shadow-lg rounded-xl p-2 hover:font-bold">
                              <GoPerson />
                              <span className="ml-2">내 프로필</span>
                            </span>
                          </Link>
                          <Link href={`/profile/${user.id}/profileProject`}>
                            <span className="flex items-center hover hover:cursor-pointer hover:border-gray-300 hover:shadow-lg rounded-xl p-2 hover:font-bold">
                              <LuFolder />
                              <span className="ml-2">내 프로젝트</span>
                            </span>
                          </Link>
                          <button
                            onClick={onLogoutHandler}
                            className="flex items-center w-full over hover:cursor-pointer hover:border-gray-300 hover:shadow-lg rounded-xl p-2 hover:font-bold"
                          >
                            <IoLogOutOutline />
                            <span className="ml-2">로그아웃</span>
                          </button>
                        </>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // user의 정보가 null일 때 로그인 메뉴
              <Link href={"/signin"}>통합로그인</Link>
            )
          ) : null}
        </nav>
      </div>
    </div>
  )
}

export default Header
