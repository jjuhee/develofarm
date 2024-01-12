import React from "react"
import Link from "next/link"

const ProfileActions = () => {
  return (
    <div className="flex float-right">
      <Link
        href={"/profile/update"}
        className="inline-block px-4 py-2 border border-blue-500 rounded-full"
      >
        수정하기
      </Link>
      <button className="inline-block px-4 py-2 border border-blue-500 rounded-full">
        내 프로젝트에 초청하기
      </button>
    </div>
  )
}

export default ProfileActions
