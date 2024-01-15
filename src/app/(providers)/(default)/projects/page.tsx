"use client"

import EmptyState from "@/components/EmptyState"
import React, { useState } from "react"
import ProjectCard from "./_components/ProjectCard"
import Spacer from "@/components/ui/Spacer"
import Category from "./_components/Category"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "./api"
import Pagination from "@mui/material/Pagination"
import { Tables } from "@/types/supabase"

const PAGE_SIZE = 5

const ProjectsPage = () => {
  const [page, setPage] = useState<number>(1)
  const [recruitStatus, setRecruitStatus] = useState(false)
  const [order, setOrder] = useState(1)

  const { data: projects } = useQuery({
    queryKey: ["projects", recruitStatus, { order: order }],
    queryFn: () =>
      getProjects({
        orderBy: "created_at",
        recruitStatus: recruitStatus,
        order: order,
      }),
    enabled: !!page && !!order,
  })

  const queryOption = {
    limit: PAGE_SIZE + (page - 1) * PAGE_SIZE - 1,
    offset: (page - 1) * PAGE_SIZE,
    recruitStatus: recruitStatus,
    order: order,
  }

  const { data: paginatedProjects } = useQuery({
    queryKey: ["projects", page, recruitStatus, { order: order }],
    queryFn: () => getProjects(queryOption),
    enabled: !!projects,
  })

  const onClickPage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

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
        <Category />

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
            {paginatedProjects?.map((item: Tables<"projects">) => (
              <ProjectCard key={item?.id} project={item} />
            ))}
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
