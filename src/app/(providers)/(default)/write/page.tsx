"use client"
import React, { useEffect } from "react"
import Editor from "./_components/Editor"
import { useRouter } from "next/navigation"
import useLoginConfirmModal from "@/hooks/useLoginConfirmModal"

const WritePage = () => {
  const accessToken = localStorage.getItem(
    process.env.NEXT_PUBLIC_AUTH_TOKEN as string,
  )
  const openLoginConfirmModal = useLoginConfirmModal()
  const router = useRouter()

  useEffect(() => {
    if (accessToken === null) {
      openLoginConfirmModal()
      router.replace("/")
    }
  }, [accessToken])

  return <>{accessToken && <Editor />}</>
}

export default WritePage
