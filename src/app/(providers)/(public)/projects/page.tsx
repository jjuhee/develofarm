import EmptyState from "@/components/EmptyState"
import React from "react"
import ProjectCard from "./_components/ProjectCard"
import Spacer from "@/components/ui/Spacer"

const ProjectsPage = () => {
  return (
    <div>
      <Spacer y={90} />
      <div>
        {/* category */}
        <section className="flex flex-col gap-3">
          <h3>필터링 검색</h3>
          <div className="flex justify-around bg-gray-200 py-8">
            <div className="flex flex-col gap-[16px] py-[15px]">
              <h5 className="text-[20px] font-[600]">프로젝트 방식</h5>
              <ul className="flex gap-3 items-center">
                <li className="border-2 border-slate-800 px-2 rounded-full ">
                  오프라인
                </li>
                <li>온라인</li>
              </ul>
            </div>
            <div className="flex flex-col gap-[16px] py-[15px]">
              <h5 className="text-[20px] font-[600]">프로젝트 기간</h5>
              <ul className="flex gap-3 items-center">
                <li className="border-2 border-slate-800 px-2 rounded-full ">
                  시작일
                </li>
                <li>종료일</li>
              </ul>
            </div>
            <div className="flex flex-col gap-[16px] py-[15px]">
              <h5 className="text-[20px] font-[600]">기술 스택</h5>
              <ul className="flex gap-3 items-center">
                <select className="border-2 border-slate-800 px-2 rounded-full">
                  <option selected>프론트엔드</option>
                  <option>React</option>
                  <option>Typescript</option>
                  <option>NextJS</option>
                  <option>Vue</option>
                  <option>Svelte</option>
                </select>
                <select className="border-2 border-slate-800 px-2 rounded-full">
                  <option selected>백엔드</option>
                </select>
                <select className="border-2 border-slate-800 px-2 rounded-full">
                  <option selected>디자인</option>
                </select>
              </ul>
            </div>
          </div>
        </section>

        {/* projects */}
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
