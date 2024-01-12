import React from "react"
import ProfileCareer from "./resumeData/ProfileCareer"
import ProfileEducation from "./resumeData/ProfileEducation"
import ProfileAcademy from "./resumeData/ProfileAcademy"
import ProfileSpec from "./resumeData/ProfileSpec"

const ProfileResume = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <ProfileCareer />
        <ProfileEducation />
      </div>
      <div className="flex justify-between items-center">
        <ProfileAcademy />
        <ProfileSpec />
      </div>
    </div>
  )
}

export default ProfileResume
