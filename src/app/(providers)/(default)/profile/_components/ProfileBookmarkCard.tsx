import React from "react"
import { FaBookmark } from "react-icons/fa"

const ProfileBookmarkCard = () => {
  return (
    <div className="border border-gray-300 bg-white rounded-lg shadow-md w-96 mt-4 mb-4">
      <div className="flex flex-col items-left">
        <img
          className="mb-2 w-full h-48 object-cover"
          src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051555.jpg?w=1380&t=st=1704962887~exp=1704963487~hmac=f6fc70ed2c7a0ca4721ba71e84aff860171d06d09ddd682bf5728784a849a08c"
          alt="project-img"
        />
        <h2 className="text-2xl font-bold ml-5 mt-4 mb-2">
          프로젝트 구인 Title
        </h2>
        <p className="text-gray-700 text-lg ml-5 mt-2 mb-4">간략내용</p>
      </div>
      <div className="flex justify-between items-center w-[370px] my-[20px] mx-auto">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
          지원하기
        </button>

        <button className="hover:scale-110 text-gray-800 font-bold rounded-full transition-transform">
          <FaBookmark className="text-3xl" />
        </button>
      </div>
    </div>
  )
}

export default ProfileBookmarkCard
