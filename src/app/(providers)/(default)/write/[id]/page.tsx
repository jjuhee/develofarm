"use client"
import { useParams } from "next/navigation"
import React from "react"
import WritePage from "../page"
import useUserStore from "@/store/user"
import { useQuery } from "@tanstack/react-query"
import { getProject, getProjectTech } from "../../projects/api"

const EditPost = () => {
  const { id: projectId } = useParams<{ id: string }>()

  return <WritePage projectId={projectId} />
}

export default EditPost
