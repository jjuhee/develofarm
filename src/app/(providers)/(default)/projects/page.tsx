"use client"

import EmptyState from "@/components/EmptyState"
import React from "react"
import ProjectCard from "./_components/ProjectCard"
import Spacer from "@/components/ui/Spacer"
import Category from "./_components/Category"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "./api"

const ProjectsPage = () => {
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })

  return (
    <div>
      <Spacer y={60} />

      <div>
        <Category />

        <Spacer y={30} />

        <div className="flex justify-between items-center">
          <p className="text-[20px] text-[#363940]">
            00건의 검색 결과를 찾았어요.
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <p>모집 중인 공고만 보기</p>
            </div>
            <select defaultValue="1" name="" id="">
              <option value="1">최신순</option>
              <option value="2">오래된순</option>
              <option value="3">찜한순</option>
            </select>
          </div>
        </div>

        <Spacer y={50} />

        <ul className="flex flex-col gap-8">
          {projects?.map((item: Projects) => (
            <ProjectCard key={item?.id} project={item} />
          ))}
        </ul>

        {/* TODO: length가 0 이면  EmptyState */}
      </div>
    </div>
  )
}

export default ProjectsPage
