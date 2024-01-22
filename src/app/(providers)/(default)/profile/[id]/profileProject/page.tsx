"use client"

import React from "react"
import { useParams } from "next/navigation"
import ProfileSharedProjectCard from "../../_components/profileProject/ProfileSharedProjectCard"
import ProfileBookmarkCard from "../../_components/profileProject/ProfileBookmarkCard"

const ProfileProjectPage = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h2 className="text-[36px] font-bold pt-5">내가 게시한 프로젝트</h2>
      <div>
        <ProfileSharedProjectCard profileId={id} />
      </div>
      <hr className="my-[70px] border-t-2 border-gray-300 " />
      <h2 className="text-[36px] font-bold">찜한 프로젝트</h2>
      <div>
        <ProfileBookmarkCard profileId={id} />
      </div>
      <hr className="my-[70px] border-t-2 border-gray-300 " />
    </div>
  )
}
export default ProfileProjectPage
