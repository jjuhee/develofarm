"use client"
import React, { useEffect } from "react"
import Editor from "./_components/Editor"
import useUserStore from "@/store/user"
import { useCustomModal } from "@/hooks/useCustomModal"
import { useRouter } from "next/navigation"
import useLoginConfirmModal from "@/hooks/useLoginConfirmModal"

const WritePage = () => {
  const user = useUserStore((state) => state.user)
  const openLoginConfirmModal = useLoginConfirmModal()
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      openLoginConfirmModal()
      router.replace("/")
    }
  }, [user])

  return <>{user && <Editor />}</>
}

export default WritePage
