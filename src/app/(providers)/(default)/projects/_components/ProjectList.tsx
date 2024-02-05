"use client"

import React, { useMemo, useState } from "react"
import { getProjects } from "../api"
import { useQuery } from "@tanstack/react-query"
import useUserStore from "@/store/user"
import useProjectsStore from "@/store/projects"
import ProjectCard from "./ProjectCard"
import SortButton from "./SortButton"
import EmptyState from "@/components/EmptyState"
import Spacer from "@/components/ui/Spacer"
import Pagination from "./Pagination"
import Checkbox from "@/components/ui/Checkbox"
import useBookmarks from "@/hooks/useBookmarks"
import Image from "next/image"

import type { TProjectsType } from "@/types/extendedType"

interface Props {
  option?: TProjectsOptions
  setIsShownCategory: React.Dispatch<React.SetStateAction<boolean>>
}

const ProjectList = ({ option, setIsShownCategory }: Props) => {
  const PAGE_SIZE = 5

  const [order, setOrder] = useState(1)
  const [recruitStatus, setRecruitStatus] = useState(false)
  const { user } = useUserStore((state) => state)
  const { page, setPage } = useProjectsStore((state) => state)

  /** 전체 프로젝트 가져오기 */
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", recruitStatus, { option: option }],
    queryFn: () =>
      getProjects({
        ...option,
        recruitStatus: recruitStatus,
      }),
    enabled: !!page,
  })

  const currentUserId = typeof user?.id === "string" ? user.id : ""
  const bookmarks = useBookmarks(currentUserId)

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

  /** 페이지네이션 리스트 */
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

  /** 페이지 변경 핸들러 */
  const onPageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    window.scroll({
      top: 0,
    })
  }

  if (isLoading) return <div>로딩중...</div>

  return (
    <>
      <div className="flex flex-col-reverse lg:justify-between lg:flex-row">
        <p className="text-[#363940]">
          {projects && projects.length > 0 ? (
            <>{projects.length}건의 검색 결과를 찾았어요.</>
          ) : (
            <>검색 결과를 찾지 못했습니다.</>
          )}
        </p>
        <div className="flex items-center justify-between mb-10 lg:justify-normal lg:mb-0">
          <Image
            src={"/icons/filter.png"}
            alt="filter icon"
            width={30}
            height={30}
            className="block cursor-pointer lg:hidden"
            onClick={() => setIsShownCategory((prev) => !prev)}
          />
          <div className="flex gap-[30px]">
            <div className="flex items-center gap-2">
              <Checkbox
                id="recruit"
                value={recruitStatus}
                handler={onChangeRecruitHandler}
              />
              <label htmlFor="recruit" className="cursor-pointer font-semibold">
                모집 중인 공고만 보기
              </label>
            </div>
            <SortButton order={order} setOrder={setOrder} setPage={setPage} />
          </div>
        </div>
      </div>

      <Spacer y={50} />

      {projects && projects.length > 0 ? (
        <ul className="flex flex-col max-w-full">
          {paginatedSortedProjects[page - 1]?.map((item: TProjectsType) => {
            return (
              <ProjectCard
                key={item?.id}
                project={item}
                bookmarks={bookmarks!}
              />
            )
          })}
        </ul>
      ) : (
        <EmptyState />
      )}

      <Spacer y={40} />

      <Pagination
        pageCount={Math.ceil(((projects && projects.length) || 0) / PAGE_SIZE)}
        currentPage={page}
        onPageChange={onPageChange}
      />
    </>
  )
}

export default ProjectList
