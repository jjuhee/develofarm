"use client"
import { useParams } from "next/navigation"
import React from "react"
import WritePage from "../page"
import useUserStore from "@/store/user"
import { useQuery } from "@tanstack/react-query"
import {
  getProject,
  getProjectTech,
  getProjectTechWithPosition,
} from "../../projects/api"

const EditPost = () => {
  const { id: projectId } = useParams<{ id: string }>()

  /** 수정시1 : 프로젝트 가져오기 */
  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
    enabled: !!projectId,
  })

  /** 수정시2 : 프로젝트의 기술 스택 + 연계된 포지션 가져오기 */
  const { data: techsWithPosition } = useQuery({
    queryKey: ["techs", projectId],
    queryFn: () => getProjectTechWithPosition(projectId),
    enabled: !!projectId,
  })
  return (
    <>
      {project && techsWithPosition && (
        <WritePage
          projectId={projectId}
          project={project}
          techsWithPositions={techsWithPosition}
        />
      )}
    </>
  )
}

export default EditPost
