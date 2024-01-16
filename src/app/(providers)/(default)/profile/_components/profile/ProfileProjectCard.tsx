import React from "react"

const ProfileProjectCard = () => {
  return (
    <div className="border border-gray-300 bg-white rounded-lg shadow-md w-80 mt-4 mb-4">
      <div className="flex flex-col items-left">
        <img
          className="mb-2 w-full h-40 object-cover"
          src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149051555.jpg?w=1380&t=st=1704962887~exp=1704963487~hmac=f6fc70ed2c7a0ca4721ba71e84aff860171d06d09ddd682bf5728784a849a08c"
          alt="project-img"
        />
        <h2 className="text-xl font-bold ml-5 mt-3 mb-2">
          프로젝트 구인 Title
        </h2>
        <p className="text-gray-700 text-sm ml-5 mt-1 mb-3">간략내용</p>
        <div className="flex items-center my-0 mx-auto"></div>
      </div>
    </div>
  )
}

export default ProfileProjectCard
