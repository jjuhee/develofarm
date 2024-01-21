"use client"

import React from "react"
import ProfileForm from "../../_components/update/ProfileForm"
import ProfileResumeForm from "../../_components/update/ProfileResumeForm"
import ProfileSocialForm from "../../_components/update/ProfileSocialForm"
import { useParams } from "next/navigation"

const UpdatePage = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="container mx-auto">
      <ProfileForm profileId={id} />
      <ProfileResumeForm profileId={id} />
      <ProfileSocialForm profileId={id} />
    </div>
  )
}

export default UpdatePage
