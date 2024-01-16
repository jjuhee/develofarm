import { Tables } from "@/types/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import React from "react"
import { deleteProject } from "../../api"
import { useRouter } from "next/navigation"

type Props = {
  project: Tables<"projects">
}

const WriterButton = ({ project }: Props) => {
  const currentUser = localStorage.getItem("sb-aksbymviolrkiainilpq-auth-token")
    ? JSON.parse(localStorage.getItem("sb-aksbymviolrkiainilpq-auth-token")!)
    : null
  const isWriter = currentUser?.user?.id === project.user_id
  const queryClient = useQueryClient()
  const router = useRouter()

  const deleteProjectMutate = useMutation({
    mutationFn: deleteProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      })
      alert("게시물이 삭제되었습니다!")
      router.replace("/projects")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const isDeleteClickHandler = (id: string) => {
    const isDelCheck = window.confirm("정말로 삭제하시겠습니까?")
    if (isDelCheck) {
      deleteProjectMutate.mutate(id)
    }
  }

  return isWriter ? (
    <>
      <li className="ml-auto">
        <Link href="/update">수정</Link>
      </li>
      <li>
        <button onClick={() => isDeleteClickHandler(project.id)}>삭제</button>
      </li>
    </>
  ) : (
    ""
  )
}

export default WriterButton
