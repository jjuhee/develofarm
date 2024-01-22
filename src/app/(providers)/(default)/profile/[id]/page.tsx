"use client"

import React, { useEffect } from "react"
import ProfileActions from "../_components/profile/ProfileActions"
import ProfileUserData from "../_components/profile/ProfileUserData"
import ProfileResume from "../_components/profile/resumes/ProfileResume"
import ProfileProjectList from "../_components/profile/projectLists/ProfileProjectList"
import ProfileSocialLinks from "../_components/profile/ProfileSocialLinks"
import { useParams } from "next/navigation"
import { useProfileStore } from "@/store/profile"

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  const setId = useProfileStore((state) => state.setId)

  useEffect(() => {
    setId(id)
  }, [id, setId])

  return (
    <div className="container mx-auto">
      <ProfileActions profileId={id} />
      <ProfileUserData profileId={id} />
      <ProfileResume profileId={id} />
      <ProfileProjectList profileId={id} />
      <ProfileSocialLinks profileId={id} />
    </div>
  )
}

export default ProfilePage
