import React from "react"
import Link from "next/link"

const ProfileCategory = () => {
  return (
    <div className="flex gap-8 text-xl font-bold">
      <Link href={"/profile"}>내프로필</Link>
      <Link href={"/profile/bookmark"}>찜한 프로젝트</Link>
      <Link href={"/profile/notification"}>알림</Link>
    </div>
  )
}

export default ProfileCategory
