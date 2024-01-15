import React from "react"
import ProfileCareer from "./resumeData/ProfileCareer"
import ProfileEducation from "./resumeData/ProfileEducation"
import ProfileAcademy from "./resumeData/ProfileAcademy"
import ProfileSpec from "./resumeData/ProfileSpec"

const ProfileResume = ({ profile }: { profile: any }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <ProfileCareer profileId={profile?.id} />
        <ProfileEducation profileId={profile?.id} />
      </div>
      <div className="flex justify-between items-center w-[1230px]">
        <ProfileAcademy profileId={profile?.id} />
        <ProfileSpec profileId={profile?.id} />
      </div>
    </div>
  )
}

export default ProfileResume
