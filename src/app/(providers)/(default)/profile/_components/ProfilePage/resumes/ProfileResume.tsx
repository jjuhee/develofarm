import React from "react"
import ProfileCareer from "./ProfileCareer"
import ProfileEducation from "./ProfileEducation"
import ProfileAcademy from "./ProfileAcademy"
import ProfileSpec from "./ProfileSpec"

const ProfileResume = ({ profileId }: { profileId: any }) => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <ProfileCareer profileId={profileId} />
        <ProfileEducation profileId={profileId} />
      </div>
      <div className="flex justify-between items-start w-[1230px]">
        <ProfileAcademy profileId={profileId} />
        <ProfileSpec profileId={profileId} />
      </div>
    </div>
  )
}

export default ProfileResume
