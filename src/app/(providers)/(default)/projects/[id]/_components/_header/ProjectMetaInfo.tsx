import dayjs from "dayjs"
import React from "react"
import TeckStackMenuBar from "./TeckStackMenuBar"
import Image from "next/image"
import { TProjectType } from "@/types/extendedType"

type Props = {
  project: TProjectType
}

const ProjectMetaInfo = ({ project }: Props) => {
  const STARED_DATE = dayjs(project?.project_start_date).format("YYYY.MM.DD")
  const END_DATE = dayjs(project?.project_end_date).format("YYYY.MM.DD")

  return (
    <section>
      <article className="flex flex-col justify-start lg:flex-row lg:items-center lg:justify-between border-t-2 border-b-2 border-zinc-600 lg:px-5">
        <article className="flex items-center lg:items-start lg:flex-col mt-8 mb-5 lg:mb-12 lg:min-w-[190px] lg:min-h-[85px]">
          <div className="flex items-center lg:items-start lg:min-w-[120px] lg:h-[30px] lg:mb-2">
            <span>
              <Image
                width={16}
                height={16}
                src="/icons/methodIcon.png"
                alt="프로젝트 방식 아이콘"
                className="mr-3 lg:inline-block"
              />
            </span>
            <h3 className="font-semibold text-lg">프로젝트 방식</h3>
          </div>
          <p className="pl-8 lg:pl-0 text-base lg:text-xl">
            {project.is_offline ? "오프라인" : "온라인"}
          </p>
        </article>
        <article className="flex items-center lg:items-start lg:flex-col mb-5 lg:mt-8 lg:mb-12 lg:min-w-[160px] lg:min-h-[85px]">
          <div className="flex items-center lg:items-start lg:min-w-[120px] lg:h-[30px] lg:mb-2">
            <span>
              <Image
                width={16}
                height={16}
                src="/icons/locationIcon.png"
                alt="활동지역 아이콘"
                className="mr-3 lg:inline-block"
              />
            </span>
            <h3 className="font-semibold text-lg">활동 지역</h3>
          </div>
          <p className="pl-8 lg:pl-0 text-base lg:text-xl">
            {project.is_offline
              ? project.region
                ? project.region.region
                : "미설정"
              : "온라인"}
          </p>
        </article>
        <article className="flex items-center lg:items-start lg:flex-col mb-5 lg:mt-8 lg:mb-12 lg:min-w-[160px] lg:min-h-[85px]">
          <div className="flex items-center lg:items-start lg:min-w-[120px] lg:h-[30px] lg:mb-2">
            <span>
              <Image
                width={20}
                height={20}
                src="/icons/addUserIcon.png"
                alt="모집인원 아이콘"
                className="mr-3 lg:inline-block"
              />
            </span>
            <h3 className="font-semibold text-lg">모집 인원</h3>
          </div>
          <p className="pl-8 lg:pl-0 text-base lg:text-xl">
            {project.number_of_people} 명
          </p>
        </article>
        <article className="flex items-center lg:items-start lg:flex-col mb-5 lg:mt-8 lg:mb-12 lg:min-w-[250px] lg:min-h-[85px]">
          <div className="flex items-center lg:items-start lg:min-w-[120px] lg:h-[30px] lg:mb-2">
            <span>
              <Image
                width={20}
                height={20}
                src="/icons/calendarIcon.png"
                alt="날짜 아이콘"
                className="mr-3 lg:inline-block"
              />
            </span>
            <h3 className="font-semibold text-lg">프로젝트 기간</h3>
          </div>
          <p className="pl-8 lg:pl-0 text-base lg:text-xl lg:min-w-[160px]">
            {STARED_DATE} - {END_DATE}
          </p>
        </article>
        <article className="flex items-center lg:items-start lg:flex-col mb-5 lg:mt-8 lg:mb-12 lg:min-w-[418px] lg:min-h-[85px]">
          <div className="flex items-center lg:items-start lg:min-w-[120px] lg:h-[30px] lg:mb-2">
            <span>
              <Image
                width={20}
                height={20}
                src="/icons/jobVacancyIcon.png"
                alt="모집분야 아이콘"
                className="mr-3 lg:inline-block"
              />
            </span>
            <h3 className="font-semibold text-lg">모집 분야</h3>
          </div>
          <div className="pl-14 lg:p-0 flex">
            <TeckStackMenuBar project={project} job={"프론트엔드"}>
              프론트엔드
            </TeckStackMenuBar>
            <TeckStackMenuBar project={project} job={"백엔드"}>
              백엔드
            </TeckStackMenuBar>
            <TeckStackMenuBar project={project} job={"디자인"}>
              디자인
            </TeckStackMenuBar>
          </div>
        </article>
      </article>
    </section>
  )
}

export default ProjectMetaInfo
