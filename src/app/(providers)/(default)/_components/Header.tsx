"use client"

import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp, IoMdSearch } from "react-icons/io"
import { VscBell } from "react-icons/vsc"
import { supabaseForClient } from "@/supabase/supabase.client"
import useUserStore from "@/store/user"
import Image from "next/image"
import { GoPerson } from "react-icons/go"
import { LuFolder } from "react-icons/lu"
import { IoLogOutOutline } from "react-icons/io5"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import { useCustomModal } from "@/hooks/useCustomModal"
import { useRouter } from "next/navigation"

const Header = () => {
  const { userId } = useUserStore((state) => state)
  const { selectCategory } = useCategoryStore((state) => state)
  const { setViewMemberModal, setMemberPosition } = useMembersStore(
    (state) => state,
  )
  const [isImageActive, setIsImageActive] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLInputElement>(null)

  const onClickMemberCategoryHandler = () => {
    selectCategory("전체보기")
    setViewMemberModal(false)
    setMemberPosition(null)
  }

  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>()

  const [showTooltip, setShowTooltip] = useState(false)

  const onAlarmHandleClick = (event: React.MouseEvent) => {
    setShowTooltip(!showTooltip)
    setIsImageActive(false)
  }

  const onAvavatarHandlerClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsImageActive((prev) => !prev)
    setShowTooltip(false)
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
  const [changeState, setChangeState] = useState(false)
  const { openCustomModalHandler: customModal } = useCustomModal()

  //
  let chekcoutAuthToken
  useEffect(() => {
    const subscription = supabaseForClient.auth.onAuthStateChange(
      (event, session) => {
        console.log("session 확인", event, session)

        console.log("useEffect내의 isloggedout", isLoggedOut)
        if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
          const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN as string
          const getAuthToken: any = localStorage.getItem(AUTH_TOKEN)
          const json1 = JSON.parse(getAuthToken)
          chekcoutAuthToken = json1
          setEmail(json1?.user.user_metadata.email)
          if (getAuthToken) {
            setIsLoggedOut(false)

            setAvatarUrl(json1?.user.user_metadata.avatar_url)
          }
        }
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

  //로그아웃 함수
  const onLogoutHandler = () => {
    //-- 이 부분은 주석이 있어야만 정상적으로 수행되는 코드 입니다.
    // localStorage.removeItem('keywords');

    supabaseForClient.auth.signOut()
    setIsLoggedOut(true)
    alert("로그아웃 되었습니다.")
    router.push("/")
    // customModal("로그아웃이 되었습니다", "alert")
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
          {isLoggedOut === false ? (
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
                onClick={onAvavatarHandlerClick}
                ref={dropdownRef}
              >
                <Image
                  className="rounded-full"
                  alt="이미지"
                  src={avatarUrl ? avatarUrl : ""}
                  width={36}
                  height={36}
                />

                {isImageActive && (
                  <div className="relative flex">
                    <div className="left-[-100px] flex-row w-[200px] rounded-lg tooltip bg-white border border-gray-300 shadow-lg  p-4 absolute top-2 z-50 ">
                      <>
                        <div>유저 이메일</div>
                        <div className="text-xs text-gray-400">{email}</div>
                        <Link href={`/profile/${userId}`}>
                          <span className="flex items-center hover hover:cursor-pointer hover:border-gray-300 hover:shadow-lg rounded-xl p-2 hover:font-bold">
                            <GoPerson />
                            <span className="ml-2">내 프로필</span>
                          </span>
                        </Link>
                        <Link href={`/profile/${userId}/profileProject`}>
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
            // isLoggedOut이 true 일때 로그인 상태

            <Link href={"/signin"}>통합로그인</Link>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Header
