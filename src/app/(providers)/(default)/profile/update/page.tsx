import React from "react"
import ProfileForm from "../_components/update/ProfileForm"
import ProfileResumeForm from "../_components/update/ProfileResumeForm"

const UpdatePage = () => {
  return (
    <div className="container mx-auto">
      <ProfileForm />
      <ProfileResumeForm />
    </div>
  )
}

export default UpdatePage
