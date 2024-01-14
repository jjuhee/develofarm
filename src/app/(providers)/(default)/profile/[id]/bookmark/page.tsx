import React from "react"
import ProfileCategory from "../_components/ProfileCategory"
import ProfileBookmarkCard from "../_components/ProfileBookmarkCard"

const BookmarkPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center w-[1440px] h-[108px] my-0 mx-auto">
        <ProfileCategory />
      </div>
      <h2 className="text-2xl font-bold pt-5">찜한 프로젝트</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
        <ProfileBookmarkCard />
        <ProfileBookmarkCard />
        <ProfileBookmarkCard />
        <ProfileBookmarkCard />
        <ProfileBookmarkCard />
        <ProfileBookmarkCard />
        <ProfileBookmarkCard />
        <ProfileBookmarkCard />
        <ProfileBookmarkCard />
      </div>
    </div>
  )
}

export default BookmarkPage
