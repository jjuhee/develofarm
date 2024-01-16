import React from "react"
import ProfileForm from "../_components/update/ProfileForm"
import ProfileResumeForm from "../_components/update/ProfileResumeForm"
import ProfileSocialForm from "../_components/update/ProfileSocialForm"

const UpdatePage = () => {
  return (
    <div className="container mx-auto">
      <ProfileForm />
      <ProfileResumeForm />
      <ProfileSocialForm />
    </div>
  )
}

export default UpdatePage
