import React from "react"
import ProfileData from "./_components/profile/ProfileData"
import ProfileProjectList from "./_components/profile/ProfileProjectList"
import ProfileActions from "./_components/profile/ProfileActions"
import ProfileResume from "./_components/profile/ProfileResume"

const ProfilePage = () => {
  return (
    <div className="container mx-auto">
      <ProfileActions />
      <ProfileData />
      <ProfileResume />
      <ProfileProjectList />
      <div>
        <div className="flex justify-between items-center w-[800px]">
          <div>
            <h2 className="flex text-lg font-semibold h-[40px]">Blog</h2>
            <p className="">https://velog.io/@</p>
          </div>
          <div>
            <h2 className="flex text-lg font-semibold h-[40px]">Github </h2>
            <p className="">https://github.com/</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
