import dayjs from "dayjs"
import React from "react"
import { getProject } from "../../../api"
import TeckStackMenuBar from "./TeckStackMenuBar"
import Image from "next/image"

type Props = {
  project: Exclude<Awaited<ReturnType<typeof getProject>>, null>
}

const ProjectMetaInfo = ({ project }: Props) => {
  const STARED_DATE = dayjs(project?.project_start_date).format("YYYY.MM.DD")
  const END_DATE = dayjs(project?.project_end_date).format("YYYY.MM.DD")

  return (
    <section>
      <article className="flex items-center justify-between border-t-2 border-b-2 border-zinc-600">
        <div className="pr-10 mt-7 mb-12 min-w-[220px] min-h-[85px]">
          <span>
            <Image
              width={16}
              height={16}
              src="/icons/methodIcon.png"
              alt="프로젝트 방식 아이콘"
              className="float-left mt-1 mr-2"
            />
          </span>
          <h3 className="font-semibold mb-3 text-lg">프로젝트 방식</h3>
          <p>{project.is_offline ? "오프라인" : "온라인"}</p>
        </div>
        <div className="pr-12 mt-7 mb-12 min-w-[190px] min-h-[85px]">
          <span>
            <Image
              width={16}
              height={16}
              src="/icons/locationIcon.png"
              alt="활동지역 아이콘"
              className="float-left mt-1 mr-2"
            />
          </span>
          <h3 className="font-semibold mb-3 text-lg">활동 지역</h3>
          <p>
            {project.is_offline
              ? project.region
                ? project.region.region
                : "미설정"
              : "온라인"}
          </p>
        </div>
        <div className="pr-10 mt-7 mb-12 min-w-[160px] min-h-[85px]">
          <span>
            <Image
              width={20}
              height={20}
              src="/icons/addUserIcon.png"
              alt="모집인원 아이콘"
              className="float-left mt-1 mr-2"
            />
          </span>
          <h3 className="font-semibold mb-3 text-lg">모집 인원</h3>
          <h3>{project.number_of_people} 명</h3>
        </div>
        <div className="pr-10 mt-7 mb-12 min-w-[250px] min-h-[85px]">
          <span>
            <Image
              width={20}
              height={20}
              src="/icons/calendarIcon.png"
              alt="날짜 아이콘"
              className="float-left mt-1 mr-2"
            />
          </span>
          <h3 className="font-semibold mb-3 text-lg">프로젝트 기간</h3>
          <p className="min-w-[250px]">
            {STARED_DATE} - {END_DATE}
          </p>
        </div>
        <div className="mt-7 mb-12 min-w-[418px] min-h-[85px]">
          <span>
            <Image
              width={20}
              height={20}
              src="/icons/jobVacancyIcon.png"
              alt="모집분야 아이콘"
              className="float-left mt-1 mr-2"
            />
          </span>
          <h3 className="font-semibold mb-3 text-lg">모집 분야</h3>
          <div className="flex">
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
        </div>
      </article>
    </section>
  )
}

export default ProjectMetaInfo
