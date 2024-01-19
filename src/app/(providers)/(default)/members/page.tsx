"use client"

import React, { useEffect, useRef } from "react"
import MemberCard from "./_components/MemberCard"
import Spacer from "@/components/ui/Spacer"
import MemberCategory from "./_components/MemberCategory"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import { getPositions, getUsers } from "./api"
import { Tables } from "@/types/supabase"
import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import MemberProfile from "./_components/MemberProfile"
import EmptyState from "@/components/EmptyState"
import useUserStore from "@/store/user"
import { ExtendedUsersType } from "@/types/extendedType"

const MembersPage = () => {
  const userId = useUserStore((state) => state.userId)

  const title = useCategoryStore((state) => state.title)

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
  } = useInfiniteQuery({
    queryKey: ["users", title],
    queryFn: ({ pageParam }) =>
      getUsers({ pageParam, positionId: memberPosition?.id }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if ((lastPage?.length as number) < 3) {
        return null
      }
      return allPages.length * 3
    },
    select: (data) => {
      return data.pages.flatMap((page) => page as ExtendedUsersType[])
    },
    enabled: !!title,
  })

  const { data: positions } = useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
  })

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return
      fetchNextPage()
    },
  })

  useOnClickOutSide({ ref: modalRef, handler: () => setViewMemberModal(false) })

  return (
    <div>
      <Spacer y={90} />
      <div className="flex w-full">
        <MemberCategory positions={positions as Tables<"positions">[]} />

        <section className="flex flex-col ml-[17rem] py-5 gap-[24px] w-full ">
          <h3 className="text-[40px] font-[700]">{title}</h3>
          <p className="text-[16px] font-[400] text-[#606060]">
            {title === "전체보기"
              ? "멤버 전체보기 페이지입니다."
              : `${title} 멤버 페이지입니다.`}
          </p>
          <div className="w-full mt-10">
            <ul className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
              {(infinityUsers?.length as number) > 0 ? (
                <>
                  {infinityUsers?.map((user) => (
                    <MemberCard
                      key={user?.id}
                      user={user}
                      title={title}
                      currentUserId={userId}
                    />
                  ))}
                </>
              ) : (
                <EmptyState />
              )}
            </ul>
          </div>
        </section>
      </div>

      {/* 무한 스크롤 기준 박스 */}
      <div ref={ref} className="w-full h-[100px]" />

      {/* 멤버 프로필 모달 */}
      {viewMemberModal && (
        <div className="flex justify-center items-center fixed w-full top-0 left-0 h-full backdrop-blur-sm bg-black bg-opacity-50 z-20">
          <div
            className="flex flex-col bg-white w-[732px] h-auto py-10 px-[50px] gap-8 rounded-3xl"
            ref={modalRef}
          >
            <MemberProfile currentUserId={userId} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MembersPage
