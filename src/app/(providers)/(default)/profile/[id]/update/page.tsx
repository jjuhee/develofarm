"use client"

import React from "react"
import { useParams } from "next/navigation"
import ProfileUpdateButton from "../../_components/UpdatePage/ProfileUpdateButton"

const UpdatePage = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="container mx-auto">
      <ProfileUpdateButton userId={id} />
    </div>
  )
}

export default UpdatePage
