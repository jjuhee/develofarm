"use client"

import { TProjectsType } from "@/types/extendedType"
import { Tables } from "@/types/supabase"
import React, { useMemo, useState } from "react"
import ProjectCard from "./ProjectCard"
import EmptyState from "@/components/EmptyState"
import Spacer from "@/components/ui/Spacer"
import { getBookmarksByUserId, getProjects } from "../api"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"
import useUserStore from "@/store/user"
import Pagination from "./Pagination"
import useProjectsStore from "@/store/projects"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"

interface Props {
  option?: TProjectsOptions
}

// TODO: SSR로 처음 데이터 가져오기
export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.fetchQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const ProjectList = ({ option }: Props) => {
  const PAGE_SIZE = 5
  const userId = useUserStore((state) => state.userId)
  const [recruitStatus, setRecruitStatus] = useState(false)
  const [order, setOrder] = useState(1)
  const [isOpenOrder, setIsOpenOrder] = useState(false)

  const { page, setPage } = useProjectsStore((state) => state)

  /** 전체 프로젝트 가져오기 */
  const { data: projects, refetch: projectRefetch } = useQuery({
    queryKey: ["projects", recruitStatus, { option: option }],
    queryFn: () =>
      getProjects({
        ...option,
        recruitStatus: recruitStatus,
      }),
    enabled: !!page,
  })

  /** 현재 유저 북마크 데이터 가져오기 */
  const { data: bookmarks } = useQuery<Tables<"bookmarks">[]>({
    queryKey: ["bookmarks", userId],
    queryFn: () => getBookmarksByUserId(userId as string),
    enabled: !!userId,
  })

  /** 프로젝트 리스트 정렬 */
  const sortedProjects = useMemo(() => {
    const draft = projects ? [...projects] : []

    draft.sort((a, b) => {
      if (order === 1) {
        return Date.parse(b.created_at!) - Date.parse(a.created_at!)
      } else if (order === 2) {
        return Date.parse(a.created_at!) - Date.parse(b.created_at!)
      } else {
        return (b.bookmark_count as number) - (a.bookmark_count as number)
      }
    })

    return draft
  }, [projects, order])

  const paginatedSortedProjects = useMemo(() => {
    const result = []
    const chunkSize = PAGE_SIZE

    for (let i = 0; i < sortedProjects.length; i += chunkSize) {
      const chunk = sortedProjects.slice(i, i + chunkSize)
      result.push(chunk)
    }

    return result
  }, [sortedProjects])

  /** 모집 중 체크박스 핸들러 */
  const onChangeRecruitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecruitStatus(e.target.checked)
    setPage(1)
  }

  const onChageOrder = (order: number) => {
    setOrder(order)
    setPage(1)
    setIsOpenOrder(false)
  }

  const onPageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    window.scroll({
      top: 0,
    })
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-[20px] text-[#363940]">
          {projects?.length}건의 검색 결과를 찾았어요.
        </p>
        <div className="flex items-center gap-[30px]">
          <div className="flex items-center gap-2">
            <input type="checkbox" onChange={onChangeRecruitHandler} />
            <p>모집 중인 공고만 보기</p>
          </div>
          <div className="relative w-[100px] text-[14px] font-[400]">
            <button
              onClick={() => setIsOpenOrder(true)}
              className="flex justify-between items-center pl-5 pr-2 h-[30px] rounded-2xl bg-[#D2D2D2] w-full"
            >
              {order === 1 ? "최신순" : order === 2 ? "오래된순" : "찜한순"}
              {isOpenOrder ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {isOpenOrder && (
              <ul className="absolute z-10 bg-white shadow-md w-full cursor-pointer rounded-lg">
                <li
                  className="pl-5 py-1 hover:bg-[#D2D2D2]"
                  onClick={() => onChageOrder(1)}
                >
                  최신순
                </li>
                <li
                  className="pl-5 py-1 hover:bg-[#D2D2D2]"
                  onClick={() => onChageOrder(2)}
                >
                  오래된순
                </li>
                <li
                  className="pl-5 py-1 hover:bg-[#D2D2D2]"
                  onClick={() => onChageOrder(3)}
                >
                  찜한순
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <Spacer y={50} />

      {(projects?.length as number) > 0 ? (
        <ul className="flex flex-col gap-8">
          {paginatedSortedProjects[(page as number) - 1]?.map((item) => {
            return (
              <ProjectCard
                key={item?.id}
                project={item as TProjectsType}
                bookmarks={bookmarks as Tables<"bookmarks">[]}
                currentUser={userId as string}
                page={page as number}
              />
            )
          })}
        </ul>
      ) : (
        <EmptyState />
      )}

      <Spacer y={40} />

      <Pagination
        pageCount={Math.ceil(((projects?.length as number) || 0) / PAGE_SIZE)}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </>
  )
}

export default ProjectList
