"use client"

import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { IoMdSearch } from "react-icons/io"
import { supabaseForClient } from "@/supabase/supabase.client"
import useUserStore from "@/store/user"
import Image from "next/image"
import { GoPerson } from "react-icons/go"
import { LuFolder } from "react-icons/lu"
import { IoLogOutOutline } from "react-icons/io5"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import { usePathname, useRouter } from "next/navigation"
import useUrlStore from "@/store/url"
import Notifications from "./Notifications"
import { useQuery } from "@tanstack/react-query"
import { getUserByUserId } from "../../api"
import { useCustomModal } from "@/hooks/useCustomModal"

const Header = () => {
  const { setUrl } = useUrlStore((state) => state)
  const { user, setUser } = useUserStore((state) => state)
  const { selectCategory } = useCategoryStore((state) => state)
  const { setViewMemberModal, setMemberPosition } = useMembersStore(
    (state) => state,
  )
  const [showTooltip, setShowTooltip] = useState(false)
  const [isImageActive, setIsImageActive] = useState<boolean>(false)
  const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false)
  const [sessionUserId, setSessionUserId] = useState<string>("")
  const dropdownRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { openCustomModalHandler } = useCustomModal()

  const { data: savedUserData, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserByUserId(sessionUserId),
    enabled: !!sessionUserId,
  })

  const onClickMemberCategoryHandler = () => {
    selectCategory("전체보기")
    setViewMemberModal(false)
    setMemberPosition(null)
  }

  const onClickAlarmHandler = () => {
    setShowTooltip(!showTooltip)
    setIsImageActive(false)
  }

  const onClickAvatarHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsImageActive((prev) => !prev)
    setShowTooltip(false)
  }

  //로그아웃 함수
  const onLogoutHandler = () => {
    supabaseForClient.auth.signOut()

    // 내프로젝트나 내프로필인 경우 홈화면으로 돌아가기
    if (
      pathname === `/profile/${user?.id}` ||
      pathname === `/profile/${user?.id}/profileProject`
    ) {
      router.push("/")
    }
  }

  useOnClickOutSide({
    ref: dropdownRef,
    handler: () => setIsImageActive(false),
  })

  // 로그아웃, 및 로그인/로그아웃 체크 및  관련 로직
  useEffect(() => {
    const subscription = supabaseForClient.auth.onAuthStateChange(
      (event, session) => {
        session && setSessionUserId(session.user.id)
        if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
          if (session && savedUserData) {
            //TODO: 저장된 유저 데이터 가져오기
            // 가져온 유저 데이터 전역 데이터로 관리
            if (savedUserData) {
              const userData = {
                id: savedUserData.id,
                nickName: savedUserData.user_nickname,
                avatarUrl: savedUserData.avatar_url,
                email: savedUserData.user_email,
                createdAt: savedUserData.created_at,
              }
              setUser(userData)
              setUrl(pathname)
            } else {
              openCustomModalHandler(
                "유저 데이터를 불러오지 못했습니다.\n로그인을 다시 실행해주세요",
                "alert",
              )
            }
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null)
        }
        // 로그인이나 로그아웃 상태를 가지고 있을 경우
        setIsAuthInitialized(true)
      },
    )
    return () => {
      subscription.data.subscription.unsubscribe()
    }
  }, [savedUserData])

  useEffect(() => {
    setUrl(pathname)
  }, [pathname])

  //END
  return (
    <div className="flex w-full bg-white shadow-lg shadow-gray-100">
      <div className="flex justify-between items-center w-[1250px] h-[96px] my-0 mx-auto px-2 ">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" width={200} height={30} />
        </Link>
        <nav className="flex items-center gap-5">
          <Link
            href={"/projects"}
            className={`text-black text-[18px] ${
              pathname === "/projects"
                ? "font-bold border-2 border-b-main-lime"
                : "font-medium"
            }`}
          >
            프로젝트 구인
          </Link>
          <Link
            href={"/members"}
            className={`text-black text-[18px] ${
              pathname === "/members"
                ? "font-bold border-2 border-b-main-lime"
                : "font-medium"
            }`}
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
          {isAuthInitialized ? (
            // user의 정보가 있을 때 프로필 메뉴 보여주기
            user ? (
              <>
                <div
                  className="text-md hover:cursor-pointer"
                  onClick={onClickAlarmHandler}
                >
                  <Notifications showTooltip={showTooltip} />
                </div>

                <div
                  className="rounded-full shadow-lg hover hover:cursor-pointer"
                  onClick={onClickAvatarHandler}
                  ref={dropdownRef}
                >
                  <Image
                    className="rounded-full"
                    alt="이미지"
                    src={user?.avatarUrl ? user?.avatarUrl : ""}
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
