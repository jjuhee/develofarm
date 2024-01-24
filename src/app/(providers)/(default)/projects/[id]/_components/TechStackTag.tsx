import { useQuery } from "@tanstack/react-query"
import React from "react"
import { getProjectTech } from "../../api"
import { Tables } from "@/types/supabase"

type Props = {
  project: Tables<"projects">
}

const TechStackTag = ({ project }: Props) => {
  const { data: projectTeck, isLoading } = useQuery({
    queryKey: ["project", { projectId: project.id }],
    queryFn: () => getProjectTech(project.id),
  })
  console.log(projectTeck)

  console.log(projectTeck)
  if (isLoading) return <div>is Loading</div>

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
