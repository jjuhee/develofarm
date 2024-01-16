import React from "react"

const ProfileUserData = () => {
  return (
    <div>
      <div className="flex items-center space-y-4 p-4">
        <img
          src="https://i.namu.wiki/i/11bab2jbR_U-fjyY58rzBgFsC4MwQBhztHGaWaTGOc9YwF0jiQc5hss0fgeXzfawAaatou9H4SOMA1NJv18Fh5UPHqspHSimZaQhD2teJOYICRc2rtehw7qFQ-Cvall90i47JzBZkTvjoxxT3CT66g.webp"
          alt="User Avatar"
          className="w-64 h-64 rounded-full mr-4"
        />
        <div className="text-left">
          <h2 className="text-2xl font-bold pl-3">닉네임</h2>
          <div className="flex w-[800px] h-[100px] my-0 mx-auto">
            <span className="flex-shrink-0 pl-3">
              <h3 className="text-lg font-semibold tracking-wide h-[40px]">
                연락처
              </h3>
              <p className="text-gray-700">010-0000-0000</p>
            </span>
            <span className="flex-shrink-0 pl-[520px]">
              <h3 className="text-lg font-semibold tracking-wide h-[40px]">
                이메일
              </h3>
              <p className="text-gray-700">abc@gmail.com</p>
            </span>
          </div>

          <div className="flex w-[800px] h-[100px] my-0 mx-auto">
            <span className="flex-shrink-0 pl-3">
              <h3 className="text-lg font-semibold tracking-wide h-[40px]">
                직무
              </h3>
              <p className="text-gray-700">프론트엔드 개발자</p>
            </span>
            <span className="flex-shrink-0 pl-[510px]">
              <h3 className="text-lg font-semibold tracking-wide h-[40px]">
                상태 업데이트
              </h3>
              <p className="text-gray-700">구인 중</p>
            </span>
          </div>
        </div>
      </div>
      <hr className="my-8 border-t-2 border-gray-300" />
    </div>
  )
}

export default ProfileUserData
