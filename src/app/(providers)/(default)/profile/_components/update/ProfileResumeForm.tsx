import React from "react"
import ProfileCareerForm from "./ProfileCareerForm"
import ProfileEducationForm from "./ProfileEducationForm"
import ProfileAcademyForm from "./ProfileAcademyForm"
import ProfileSpecForm from "./ProfileSpecForm"

const ProfileResumeForm = ({ profileId }: { profileId: any }) => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <ProfileCareerForm profileId={profileId} />
        <ProfileEducationForm profileId={profileId} />
      </div>
      <div className="flex justify-between items-start">
        <ProfileAcademyForm profileId={profileId} />
        <ProfileSpecForm profileId={profileId} />
      </div>
    </div>
  )
}

export default ProfileResumeForm
