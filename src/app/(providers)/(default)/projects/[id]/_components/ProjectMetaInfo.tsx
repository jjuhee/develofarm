import { Tables } from "@/types/supabase"
import dayjs from "dayjs"
import React from "react"

type Props = {
  project: Tables<"projects">
  region: Tables<"project_regions">
}

const ProjectMetaInfo = ({ project, region }: Props) => {
  const STARED_DATE = dayjs(project?.project_start_date).format("YYYY.MM.DD")
  const END_DATE = dayjs(project?.project_end_date).format("YYYY.MM.DD")

  return (
    <section>
      <div className="flex items-center justify-center border-t-2 border-b-2 border-zinc-600">
        <div className="pr-20 mt-7 mb-12">
          <h3 className="font-semibold">프로젝트 방식</h3>
          <p>{project.is_offline ? "오프라인" : "온라인"}</p>
        </div>
        <div className="pr-24 mt-7 mb-12">
          <h3 className="font-semibold">활동 지역</h3>
          <p>
            {project.is_offline
              ? region
                ? region.region
                : "미설정"
              : "온라인"}
          </p>
        </div>
        <div className="pr-24 mt-7 mb-12">
          <h3 className="font-semibold">프로젝트 기간</h3>
          <p>
            {STARED_DATE} - {END_DATE}
          </p>
        </div>
        <div className="pr-24 mt-7 mb-12">
          <h3 className="font-semibold">모집분야</h3>
          <select>
            <option>프론트엔드</option>
            <option>프론트엔드</option>
            <option>프론트엔드</option>
          </select>
          <select>
            <option>벡엔드</option>
          </select>
          <select>
            <option>디자이너</option>
          </select>
        </div>
        <div>
          <h3 className="font-semibold">구인 인원</h3>
          <h3>{project.number_of_people} 명</h3>
        </div>
      </div>
    </section>
  )
}

export default ProjectMetaInfo
