"use client"

import EmptyState from "@/components/EmptyState"
import React, { useEffect, useState, useMemo } from "react"
import ProjectCard from "./_components/ProjectCard"
import Spacer from "@/components/ui/Spacer"
import { useQuery } from "@tanstack/react-query"
import { getBookmarksByUserId, getProjectTech, getProjects } from "./api"
import Pagination from "@mui/material/Pagination"
import { Tables } from "@/types/supabase"
import Category from "../write/_components/Category"
import useUserStore from "@/store/user"
import scrollToTop from "@/utils/scrollTop"

const PAGE_SIZE = 5

const ProjectsPage = () => {
  const user = useUserStore((state) => state.user)

  const [page, setPage] = useState<number>(1)
  const [recruitStatus, setRecruitStatus] = useState(false)
  const [order, setOrder] = useState(1)

  /** 필터링 검색 옵션 */
  const [option, setOption] = useState<TProjectsOptions>({
    isOffline: null,
    startDate: "",
    endDate: "",
    regionId: "",
    techs: [],
  })

  const initialCategoryData: TCategoryData = {
    startDate: "",
    endDate: "",
    isOffline: null,
    region: "",
    numberOfMembers: 0,
    positions: [],
    techs: [],
  }
  const [categoryData, setCategoryData] =
    useState<TCategoryData>(initialCategoryData)

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
    queryKey: ["bookmarks", user],
    queryFn: () => getBookmarksByUserId(user as string),
    enabled: !!user,
  })

  const onClickPage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
    window.scroll({
      top: 0,
    })
  }

  /** 모집 중 체크박스 핸들러 */
  const onChangeRecruitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setRecruitStatus(true)
    } else {
      setRecruitStatus(false)
    }
  }

  const onChageOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(Number(e.target.value))
  }

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

  return (
    <div>
      <Spacer y={60} />

      <div>
        <Category
          categoryData={categoryData}
          isWritePage={false}
          setCategoryData={setCategoryData}
          setOption={setOption}
        />

        <Spacer y={30} />

        <div className="flex justify-between items-center">
          <p className="text-[20px] text-[#363940]">
            {projects?.length}건의 검색 결과를 찾았어요.
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <input type="checkbox" onChange={onChangeRecruitHandler} />
              <p>모집 중인 공고만 보기</p>
            </div>
            <select defaultValue="1" name="" id="" onChange={onChageOrder}>
              <option value="1">최신순</option>
              <option value="2">오래된순</option>
              <option value="3">찜한순</option>
            </select>
          </div>
        </div>

        <Spacer y={50} />

        {(projects?.length as number) > 0 ? (
          <ul className="flex flex-col gap-8">
            {paginatedSortedProjects[page - 1]?.map(
              (item: Tables<"projects">) => {
                return (
                  <ProjectCard
                    key={item?.id}
                    project={item}
                    bookmarks={bookmarks as Tables<"bookmarks">[]}
                    currentUser={user as string}
                  />
                )
              },
            )}
          </ul>
        ) : (
          <EmptyState />
        )}
      </div>

      <Pagination
        className="flex justify-center mt-20"
        count={Math.ceil(((projects?.length as number) || 0) / PAGE_SIZE)}
        page={page}
        defaultPage={1}
        shape="rounded"
        onChange={onClickPage}
      />
    </div>
  )
}

export default ProjectsPage
