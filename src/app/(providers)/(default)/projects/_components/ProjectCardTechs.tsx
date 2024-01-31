import { TProjectsType } from "@/types/extendedType"
import React from "react"

interface Props {
  project: TProjectsType
}

const ProjectCardTechs = ({ project }: Props) => {
  const techs = project?.project_tech
  return (
    <>
      {techs?.length > 5 ? (
        <>
          {techs?.slice(0, 5).map((tech, i) => (
            <li
              key={i}
              className="flex justify-center items-center bg-[#E6E6E6] text-[#636366] px-3 py-1 rounded-3xl"
            >
              {tech?.techs?.tech_name}
            </li>
          ))}
          <li className="group">
            <div className="flex justify-center items-center bg-[#E6E6E6] text-[#636366] px-3 py-1 rounded-3xl">
              ...
            </div>
            <ul className="absolute right-0 top-[50px] bg-[#E6E6E6] text-[#636366] rounded-lg z-10 hidden group-hover:block">
              {techs?.slice(5).map((tech, i) => (
                <li
                  key={i}
                  className="flex justify-center items-center bg-[#E6E6E6] text-[#636366] px-3 py-1 rounded-3xl"
                >
                  {tech?.techs?.tech_name}
                </li>
              ))}
            </ul>
          </li>
        </>
      ) : (
        <>
          {techs?.map((tech, i) => (
            <li
              key={i}
              className="flex justify-center items-center bg-[#E6E6E6] text-[#636366] px-3 py-1 rounded-3xl"
            >
              {tech?.techs?.tech_name}
            </li>
          ))}
        </>
      )}
    </>
  )
}
export default ProjectCardTechs
