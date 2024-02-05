import React from "react"

import type { TProjectsType } from "@/types/extendedType"
import type { Tables } from "@/types/supabase"

interface Props {
  project: TProjectsType
}

interface TTechType extends Tables<"project_tech"> {
  techs: Tables<"techs"> | null
}

const ProjectCardTechs = ({ project }: Props) => {
  const techs: TTechType[] = project && project.project_tech

  const slicedTechs = techs && techs.length > 5 ? techs.slice(0, 5) : techs

  return (
    <>
      {slicedTechs?.slice(0, 5).map((tech, i) => (
        <li
          key={i}
          className="flex justify-center items-center bg-[#E6E6E6] text-[#636366] text-xs font-normal px-3 py-1 rounded-3xl"
        >
          {tech?.techs?.tech_name}
        </li>
      ))}
      {techs && techs.length > 5 && (
        <li className="group relative text-xs font-normal ">
          <div className="flex justify-center items-center bg-[#E6E6E6] text-[#636366] px-3 py-1 rounded-3xl">
            ...
          </div>
          <div className="hidden group-hover:block">
            <ul className="absolute right-0 top-[30px] flex items-center gap-3 h-[35px] py-2 px-3 bg-[#E6E6E6] text-[#636366] rounded-lg z-10 ">
              {techs?.slice(5).map((tech, i) => (
                <li
                  key={i}
                  className=" bg-[#E6E6E6] text-[#636366] text-xs font-normal rounded-3xl"
                >
                  {tech?.techs?.tech_name}
                </li>
              ))}
            </ul>
          </div>
        </li>
      )}
    </>
  )
}
export default ProjectCardTechs
