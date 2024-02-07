"use client"

import React, { useEffect } from "react"
import { useParams } from "next/navigation"
import ProfileUpdateButton from "../../_components/UpdatePage/ProfileUpdateButton"
import { useProfileStore } from "@/store/profile"

const UpdatePage = () => {
  const { id } = useParams<{ id: string }>()
  const setId = useProfileStore((state) => state.setId)

  useEffect(() => {
    setId(id)
  }, [id, setId])

  return (
    <div className="container mx-auto">
      <ProfileUpdateButton userId={id} />
    </div>
  )
}

export default UpdatePage
