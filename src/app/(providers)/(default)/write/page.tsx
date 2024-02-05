"use client"
import React, { useEffect, useState } from "react"
import Editor from "./_components/Editor"
import { useRouter } from "next/navigation"
import useLoginConfirmModal from "@/hooks/useLoginConfirmModal"

const WritePage = () => {
  const openLoginConfirmModal = useLoginConfirmModal()
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem(
      process.env.NEXT_PUBLIC_AUTH_TOKEN as string,
    )
    if (accessToken === null) {
      openLoginConfirmModal()
      router.replace("/")
    } else {
      setIsLogin(true)
    }
  }, [])

  return <>{isLogin && <Editor />}</>
}

export default WritePage
