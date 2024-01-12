import React from "react"
import ProfileProjectCard from "./ProfileProjectCard"

const ProfileProjectList = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold pt-5">참여 중인 프로젝트</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
        <ProfileProjectCard />
        <ProfileProjectCard />
        <ProfileProjectCard />
      </div>
      <hr className="my-[70px] border-t-2 border-gray-300 " />
      <h2 className="text-2xl font-bold pt-5">참여했던 프로젝트</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
        <ProfileProjectCard />
        <ProfileProjectCard />
        <ProfileProjectCard />
        <ProfileProjectCard />
        <ProfileProjectCard />
        <ProfileProjectCard />
      </div>
      <hr className="my-[70px] border-t-2 border-gray-300 " />
    </div>
  )
}

export default ProfileProjectList
