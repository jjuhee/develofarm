import React from "react"
import ProfileCareerForm from "./ProfileCareerForm"
import ProfileEducationForm from "./ProfileEducationForm"
import ProfileAcademyForm from "./ProfileAcademyForm"
import ProfileSpecForm from "./ProfileSpecForm"

const ProfileResumeForm = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <ProfileCareerForm />
        <ProfileEducationForm />
      </div>
      <div className="flex justify-between items-center">
        <ProfileAcademyForm />
        <ProfileSpecForm />
      </div>
    </div>
  )
}

export default ProfileResumeForm
