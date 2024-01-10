import EmptyState from "@/components/EmptyState"
import React from "react"
import ProjectCard from "./_components/ProjectCard"
import Spacer from "@/components/ui/Spacer"
import Category from "./_components/Category"

const ProjectsPage = () => {
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
            <select name="" id="">
              <option value="" selected>
                최신순
              </option>
              <option value="">오래된순</option>
              <option value="">찜한순</option>
            </select>
          </div>
        </div>

        <Spacer y={50} />

        <ul className="flex flex-col gap-8">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </ul>

        {/* TODO: length가 0 이면  EmptyState */}
      </div>
    </div>
  )
}

export default ProjectsPage
