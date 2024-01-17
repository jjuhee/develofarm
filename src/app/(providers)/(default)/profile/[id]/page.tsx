"use client"

import React from "react"
import ProfileActions from "../_components/profile/ProfileActions"
import ProfileUserData from "../_components/profile/ProfileUserData"
import ProfileProjectList from "../_components/profile/projectLists/ProfileProjectList"
import ProfileSocialLinks from "../_components/profile/ProfileSocialLinks"
import { useParams } from "next/navigation"
import ProfileResume from "../_components/profile/resumes/ProfileResume"

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>()

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
