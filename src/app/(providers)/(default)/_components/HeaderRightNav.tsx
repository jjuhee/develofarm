import Link from "next/link"
import React, { useRef, useState } from "react"
import Notifications from "./Notifications"
import Image from "next/image"
import { GoPerson } from "react-icons/go"
import { LuFolder } from "react-icons/lu"
import { IoLogOutOutline } from "react-icons/io5"
import { supabaseForClient } from "@/supabase/supabase.client"
import { usePathname, useRouter } from "next/navigation"
import { TUserData } from "@/types/users"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"

interface Props {
  isAuthInitialized: boolean
  user: TUserData
}

const HeaderNav = ({ isAuthInitialized, user }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isImageActive, setIsImageActive] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLInputElement>(null)
  const alarmDropdownRef = useRef<HTMLInputElement>(null)

  const pathname = usePathname()
  const router = useRouter()

  /** 알림 버튼 핸들러 */
  const onClickAlarmHandler = () => {
    setShowTooltip(!showTooltip)
    setIsImageActive(false)
  }

  /** 프로필 아바타 클릭 핸들러 */
  const onClickAvatarHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsImageActive((prev) => !prev)
    setShowTooltip(false)
  }

  /** 로그아웃 */
  const onLogoutHandler = () => {
    supabaseForClient.auth.signOut()

    /** 내프로젝트나 내프로필인 경우 홈화면으로 돌아가기 */
    if (
      pathname === `/profile/${user?.id}` ||
      pathname === `/profile/${user?.id}/profileProject`
    ) {
      router.push("/")
    }
  }

  /** 드롭다운 바깥 영역 선택 시 닫기 */
  useOnClickOutSide({
    ref: dropdownRef,
    handler: () => setIsImageActive(false),
  })

  useOnClickOutSide({
    ref: alarmDropdownRef,
    handler: () => setShowTooltip(false),
  })

  return (
    <nav className="flex items-center gap-[30px]">
      <Link href={"/search"} className="text-lg">
        <Image src="/icons/search.png" alt="search" width={20} height={20} />
      </Link>

      {/* 유저가 로그인 중일 때 메뉴 숨기기 */}
      {isAuthInitialized ? (
        // user의 정보가 있을 때 프로필 메뉴 보여주기
        user ? (
          <>
            <div
              className="text-md hover:cursor-pointer"
              onClick={onClickAlarmHandler}
              ref={alarmDropdownRef}
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
                <div className="relative flex *:bg-white">
                  <div className="left-[-135px] flex-row w-[180px] rounded-lg border-[1px] border-[#F2F4F7] shadow-md  absolute top-2 z-50 ">
                    <>
                      <p className="font-[600] px-[16px] py-[7px]">
                        {user.nickName}님의 이메일
                      </p>
                      <p className="px-[16px] text-xs text-gray-400">
                        {user.email}
                      </p>
                      <Link href={`/profile/${user.id}`}>
                        <span className="flex items-center px-[16px] leading-[38px] h-[38px] hover:bg-[#DBFFB2]">
                          <GoPerson />
                          <span className="ml-2">내 프로필</span>
                        </span>
                      </Link>
                      <Link href={`/profile/${user.id}/profileProject`}>
                        <span className="flex items-center px-[16px] leading-[38px] h-[38px] hover:bg-[#DBFFB2]">
                          <LuFolder />
                          <span className="ml-2">내 프로젝트</span>
                        </span>
                      </Link>
                      <button
                        onClick={onLogoutHandler}
                        className="flex items-center w-[180px] px-[16px] leading-[38px] h-[38px] first:rounded-t-lg last:rounded-b-lg hover:bg-[#DBFFB2]"
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
  )
}

export default HeaderNav
