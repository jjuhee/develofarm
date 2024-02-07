"use client"

import { useQuery } from "@tanstack/react-query"
import React from "react"
import { getProjectTech } from "../../../api"
import Image from "next/image"
import { TProjectType } from "@/types/extendedType"

type Props = {
  project: TProjectType
}

const TechStackTag = ({ project }: Props) => {
  const { data: projectTeck, isLoading } = useQuery({
    queryKey: ["projectTeck", { projectId: project.id }],
    queryFn: () => getProjectTech(project.id),
  })

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Image src={"/images/load.gif"} alt="load" width={200} height={200} />
      </div>
    )

  return (
    <ul className="flex text-sm">
      {projectTeck?.map((teck, i) => {
        return (
          <li
            className="p-2 pl-3 pr-3 mr-2 rounded-3xl text-[#666666] bg-[#E6E6E6]"
            key={i}
          >
            {teck}
          </li>
        )
      })}
    </ul>
  )
}

export default TechStackTag
