"use client"

import { Tables } from "@/types/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import React from "react"
import { removeProject } from "../../../api"
import { useRouter } from "next/navigation"
import { useCustomModal } from "@/hooks/useCustomModal"

type Props = {
  project: Tables<"projects">
  isWriter: boolean
}

const WriterEditRemoveButtons = ({ project, isWriter }: Props) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { openCustomModalHandler } = useCustomModal()

  const removeProjectMutate = useMutation({
    mutationFn: removeProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
      openCustomModalHandler("삭제되었습니다!", "alert")
      router.replace("/projects")
    },
    onError: (error) => {
      openCustomModalHandler(`Error: ${error}`, "alert")
    },
  })

  const isDeleteClickHandler = (id: string) => {
    const handler = () => {
      removeProjectMutate.mutate(id)
    }

    openCustomModalHandler("정말로 삭제하시겠습니까?", "confirm", handler)
  }

  return (
    isWriter && (
      <>
        {project.recruit_status === true ? (
          ""
        ) : (
          <li className="ml-8 lg:ml-auto">
            <Link className="text-zinc-400" href={`/write/${project.id}`}>
              수정
            </Link>
          </li>
        )}

        <li className={`${project.recruit_status === true && "ml-auto"}`}>
          <button onClick={() => isDeleteClickHandler(project.id)}>삭제</button>
        </li>
      </>
    )
  )
}

export default WriterEditRemoveButtons
