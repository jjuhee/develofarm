import React from "react"
import ProfileCategory from "./_components/ProfileCategory"
import Link from "next/link"
import ProfileProjectCard from "./_components/ProfileProjectCard"
import ProfileResume from "./_components/ProfileResume"
import ProfileUserData from "./_components/ProfileUserData"

const ProfilePage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-[1440px] h-[108px] my-0 mx-auto">
        <ProfileCategory />
        <Link href={"/profile/update"}>수정하기</Link>
      </div>
      <ProfileUserData />
      <ProfileResume />
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
    </div>
  )
}

export default ProfilePage
