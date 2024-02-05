"use client"
import React, { PropsWithChildren, useEffect, useState } from "react"
import ProfileCategory from "./_components/ProfileCategory"
import { useRouter } from "next/navigation"
import useLoginConfirmModal from "@/hooks/useLoginConfirmModal"

const ProfileLayout = ({ children }: PropsWithChildren<{}>) => {
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

  return (
    <>
      {" "}
      {isLogin && (
        <div>
          <ProfileCategory />
          {children}
        </div>
      )}
    </>
  )
}

export default ProfileLayout
