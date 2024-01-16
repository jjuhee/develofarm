"use client"

import { supabaseForClient } from "@/supabase/supabase.client"
import React, { useEffect, useState } from "react"
import ProfileActions from "./_components/profile/ProfileActions"
import ProfileData from "./_components/profile/ProfileData"
import ProfileResume from "./_components/profile/ProfileResume"
import ProfileProjectList from "./_components/profile/ProfileProjectList"
import ProfileSocialLinks from "./_components/profile/ProfileSocialLinks"

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>()

  useEffect(() => {
    supabaseForClient.auth.getUser().then((response) => {
      if (!response.data.user) {
        return
      }

      supabaseForClient
        .from("users")
        .select("*")
        .eq("id", response.data.user.id)
        .single()
        .then((response) => {
          setProfile(response.data)
        })
    })
  }, [])

  console.log(profile)

  return (
    <div className="container mx-auto">
      <ProfileActions />
      <ProfileData profile={profile} />
      <ProfileResume profile={profile} />
      <ProfileProjectList profileId={profile?.id} />
      <ProfileSocialLinks profileId={profile?.id} />
    </div>
  )
}

export default ProfilePage
