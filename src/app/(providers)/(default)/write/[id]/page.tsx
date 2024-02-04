"use client"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  getProject,
  getProjectTech,
  getProjectTechWithPosition,
} from "../../projects/api"
import Editor from "../_components/Editor"
import useUserStore from "@/store/user"

const EditPost = () => {
  const { id: projectId } = useParams<{ id: string }>()
  const user = useUserStore((state) => state.user)

  /** 수정시1 : 프로젝트 가져오기 */
  const { data: project } = useQuery({
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

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login") // 로그인 페이지로 리다이렉트
    }
  }, [])

  return (
    <>
      {project && techsWithPosition && (
        <Editor
          projectId={projectId}
          project={project}
          techsWithPositions={techsWithPosition}
        />
      )}
    </>
  )
}

export default EditPost
