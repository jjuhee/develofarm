"use client"

import React, { useEffect, useRef } from "react"
import Spacer from "@/components/ui/Spacer"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import { Tables } from "@/types/supabase"
import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import EmptyState from "@/components/EmptyState"
import useUserStore from "@/store/user"
import { UsersType } from "@/types/extendedType"
import Image from "next/image"
import { getPositions, getUsers } from "../api"
import MemberCategory from "./MemberCategory"
import MemberCard from "./MemberCard"
import MemberProfile from "./MemberProfile"

const MembersComponent = () => {
  const category = useCategoryStore((state) => state.category)

  const { viewMemberModal, setViewMemberModal, memberPosition } =
    useMembersStore((state) => state)

  const modalRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (viewMemberModal) {
      document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`
      return () => {
        const scrollY = document.body.style.top
        document.body.style.cssText = ""
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
      }
    }
  }, [viewMemberModal])

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
      return data.pages.flatMap((page) => page as UsersType[])
    },
    enabled: !!category,
  })

  const { data: positions } = useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
  })

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
      <Spacer y={90} />
      <div className="flex flex-col w-full">
        <section className="flex flex-col py-5 gap-[20px] w-full ">
          <span className="text-[16px] text-[#80E500] font-[600]">
            Our members
          </span>
          <h3 className="text-[40px] font-[700]">{category}</h3>
          <p className="text-[16px] font-[400] text-[#606060] mt-3">
            {category === "전체보기"
              ? "멤버 전체보기 페이지입니다."
              : `${category} 멤버 페이지입니다.`}
          </p>

          <MemberCategory positions={positions as Tables<"positions">[]} />
          <div className="w-full mt-7">
            <ul className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-4">
              {(infinityUsers?.length as number) > 0 ? (
                <>
                  {infinityUsers?.map((user: UsersType, index) => (
                    <MemberCard key={user?.id + index} user={user} />
                  ))}
                </>
              ) : (
                <EmptyState />
              )}
            </ul>
          </div>
        </section>
        <div ref={ref} className="w-full h-[100px]" />
      </div>

      {/* 무한 스크롤 기준 박스 */}

      {/* 멤버 프로필 모달 */}
      {viewMemberModal && (
        <div className="flex justify-center items-center fixed w-full top-0 left-0 h-full backdrop-blur-sm bg-black bg-opacity-50 z-20">
          <div
            className="flex flex-col bg-white w-[732px] h-auto py-10 px-[50px] gap-[30px] rounded-3xl"
            ref={modalRef}
          >
            <MemberProfile />
          </div>
        </div>
      )}
    </div>
  )
}

export default MembersComponent
