import React, { PropsWithChildren } from "react"
import ProfileCategory from "./_components/ProfileCategory"

const ProfileLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <ProfileCategory />
      {children}
    </div>
  )
}

export default ProfileLayout
