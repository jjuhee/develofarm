"use client"

import React, { useRef } from "react"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import Spacer from "@/components/ui/Spacer"
import { useInView } from "react-intersection-observer"
import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import Image from "next/image"
import { getPositions, getUsers } from "../api"
import MemberCategory from "./MemberCategory"
import MemberProfileModal from "./MemberProfileModal"
import MemberList from "./MemberList"
import useScrollLock from "@/hooks/useScrollLock"

import type { TUsersType } from "@/types/extendedType"
import type { Tables } from "@/types/supabase"

const MembersComponent = () => {
  const category = useCategoryStore((state) => state.category)

  const { viewMemberModal, setViewMemberModal, memberPosition } =
    useMembersStore((state) => state)

  const modalRef = useRef<HTMLInputElement>(null)

  useScrollLock(viewMemberModal)

  /** 무한 스크롤 데이터 가져오기 */
  const {
    data: infinityUsers,
    error,
    fetchNextPage,
    hasNextPage,
    isFetched,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["users", category],
    queryFn: ({ pageParam }) =>
      getUsers({ pageParam, positionId: memberPosition?.id }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if ((lastPage?.length as number) < 4) {
        return null
      }
      return allPages.length * 4
    },
    select: (data) => {
      return data.pages.flatMap((page) => page as TUsersType[])
    },
    enabled: !!category,
  })

  const { data: positions } = useQuery<unknown, Error, Tables<"positions">[]>({
    queryKey: ["positions"],
    queryFn: getPositions,
  })

  /** 무한 스크롤 기준 박스 속성 */
  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return
      fetchNextPage()
    },
  })

  useOnClickOutSide({ ref: modalRef, handler: () => setViewMemberModal(false) })

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Image src={"/images/load.gif"} alt="load" width={200} height={200} />
      </div>
    )

  return (
    <div>
      <Spacer y={30} />
      <div className="flex flex-col w-full">
        <section className="flex flex-col py-5 gap-[20px] w-full ">
          {/* 인재풀 타이틀 및 설명 */}
          <h3 className="text-[#80E500]">Our members</h3>
          <h1>{category === "전체보기" ? "디벨롭팜의 인재풀" : category}</h1>
          <p className="text-[#606060] mt-3 whitespace-pre-line">
            {category === "전체보기"
              ? "디벨롭팜에서 현재 프로젝트에 지원 중인 멤버들을 확인할 수 있습니다\n원하는 멤버를 자신의 프로젝트에 초대해보세요"
              : `${category} 멤버를 자신의 프로젝트에 초대해보세요`}
          </p>

          {/* 멤버 포지션 카테고리 */}
          <MemberCategory positions={positions!} />

          {/* 멤버 리스트 */}
          <MemberList infinityUsers={infinityUsers!} />
        </section>
        {/* 무한 스크롤 기준 박스 */}
        <div ref={ref} className="w-full h-[100px]" />
      </div>

      {/* 멤버 프로필 모달 */}
      {viewMemberModal && (
        <div className="flex justify-center items-center fixed w-full top-0 left-0 h-full backdrop-blur-sm bg-black bg-opacity-50 z-20">
          <div
            className="flex flex-col bg-white w-[732px] h-auto py-10 px-[50px] gap-[30px] rounded-3xl"
            ref={modalRef}
          >
            <MemberProfileModal />
          </div>
        </div>
      )}
    </div>
  )
}

export default MembersComponent
