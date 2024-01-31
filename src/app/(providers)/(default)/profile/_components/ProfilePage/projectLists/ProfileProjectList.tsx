import React from "react"
import ProfileWorkingProjectCard from "./ProfileWorkingProjectCard"
import ProfilePastProjectCard from "./ProfilePastProjectCard"

const ProfileProjectList = ({ profileId }: { profileId: string }) => {
  return (
    <div>
      <h2 className="text-[36px] font-bold pt-5">참여 중인 프로젝트</h2>
      <div>
        <ProfileWorkingProjectCard profileId={profileId} />
      </div>
      <hr className="my-[70px] border-t-2 border-gray-300 " />
      <h2 className="text-[36px] font-bold">참여했던 프로젝트</h2>
      <div>
        <ProfilePastProjectCard profileId={profileId} />
      </div>
      <hr className="my-[70px] border-t-2 border-gray-300 " />
    </div>
  )
}

export default ProfileProjectList
