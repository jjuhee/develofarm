"use client"

import React, { useEffect } from "react"
import { useParams } from "next/navigation"
import ProfileActions from "../_components/ProfilePage/ProfileActions"
import ProfileUserData from "../_components/ProfilePage/ProfileUserData"
import ProfileResume from "../_components/ProfilePage/resumes/ProfileResume"
import ProfileProjectList from "../_components/ProfilePage/projectLists/ProfileProjectList"
import ProfileSocialLinks from "../_components/ProfilePage/ProfileSocialLinks"
import { useProfileStore } from "@/store/profile"

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>()
  const { setId } = useProfileStore((state) => state)

  useEffect(() => {
    setId(id)
  }, [id])

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
