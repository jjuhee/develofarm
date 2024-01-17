"use client"

import EmptyState from "@/components/EmptyState"
import React, { useEffect, useState } from "react"
import ProjectCard from "./_components/ProjectCard"
import Spacer from "@/components/ui/Spacer"
import { useQuery } from "@tanstack/react-query"
import {
  getBookmarks,
  getBookmarksByUserId,
  getBookmarksCountByProject,
  getProjectTech,
  getProjects,
} from "./api"
import Pagination from "@mui/material/Pagination"
import { Database, Tables } from "@/types/supabase"
import Category from "../write/_components/Category"
import { supabaseForClient } from "@/supabase/supabase.client"

const PAGE_SIZE = 5

const ProjectsPage = () => {
  const [currentUser, setCurrentUser] = useState("")

  /** 현재 인증된 유저 데이터 가져오기 */
  useEffect(() => {
    const getAuth = async () => {
      const user = await supabaseForClient.auth.getUser()
      setCurrentUser(user.data.user?.id as string)
    }
    getAuth()
  }, [currentUser])

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

  const [page, setPage] = useState<number>(1)

  const [recruitStatus, setRecruitStatus] = useState(false)

  const [order, setOrder] = useState(1)

  const [projectId, setProjectId] = useState("")

  /** 프로젝트 데이터를 가져오기 위한 useQuery 옵션 */
  const queryOption = {
    order: order,
    recruitStatus: recruitStatus,
    isOffline: categoryData.isOffline,
    startDate: categoryData.startDate,
    endDate: categoryData.endDate,
    numberOfPeople: categoryData.numberOfMembers,
    regionId: categoryData.region,
    techs: categoryData.techs,
  }

  /** 전체 프로젝트 가져오기 */
  const { data: projects } = useQuery({
    queryKey: [
      "projects",
      recruitStatus,
      { order: order },
      { categoryData: categoryData },
    ],
    queryFn: () => getProjects(queryOption),
    enabled: !!page && !!order,
  })

  /** 페이지 단위 프로젝트 가져오기 */
  const { data: paginatedProjects } = useQuery({
    queryKey: [
      "projects",
      page,
      recruitStatus,
      { order: order },
      { categoryData: categoryData },
    ],
    queryFn: () =>
      getProjects({
        ...queryOption,
        limit: PAGE_SIZE + (page - 1) * PAGE_SIZE - 1,
        offset: (page - 1) * PAGE_SIZE,
      }),
    enabled: !!projects,
  })

  const { data: bookmarks } = useQuery<Tables<"bookmarks">[]>({
    queryKey: ["bookmarks", currentUser],
    queryFn: () => getBookmarksByUserId(currentUser),
    enabled: !!currentUser,
  })

  /** 프로젝트 기술 스택 가져오기 */
  const { data: techs } = useQuery({
    queryKey: ["techs", projectId],
    queryFn: () => getProjectTech(projectId),
    enabled: !!projectId,
  })

  const onClickPage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  /** 모집 중 체크박스 */
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

  return (
    <div>
      <Spacer y={60} />

      <div>
        <Category
          categoryData={categoryData}
          isWritePage={false}
          setCategoryData={setCategoryData}
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
            {paginatedProjects?.map((item: Tables<"projects">) => {
              return (
                <ProjectCard
                  key={item?.id}
                  project={item}
                  bookmarks={bookmarks}
                  currentUser={currentUser}
                  setProjectId={setProjectId}
                  techs={techs}
                />
              )
            })}
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
