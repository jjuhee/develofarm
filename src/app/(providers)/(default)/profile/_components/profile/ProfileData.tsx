import React from "react"

const ProfileData = ({ profile }: { profile: any }) => {
  return (
    <div className="pt-3">
      {/* 유저 데이터 */}
      <div className="flex items-center space-y-4 p-4">
        <img
          src={profile && profile.avatar_url}
          alt="User Avatar"
          className="w-64 h-64 rounded-full mr-4"
        />
        <div className="text-left pl-3">
          <h2 className="w-[400px] mb-[30px] text-3xl font-semibold">
            {profile && profile.user_nickname}
          </h2>
          <div className="flex">
            <div>
              <h3 className="flex text-lg font-semibold tracking-wide h-[40px]">
                연락처
              </h3>
              <p className="w-[400px]">
                {profile && profile.user_phone_number}
              </p>
            </div>
            <div className="ml-[200px]">
              <h3 className="flex text-lg font-semibold tracking-wide h-[40px]">
                이메일
              </h3>
              <p className="w-[400px]">{profile && profile.user_email}</p>
            </div>
          </div>
          <div className="flex pt-[30px]">
            <div>
              <h3 className="flex text-lg font-semibold tracking-wide h-[40px]">
                직무
              </h3>
              <p className="w-[400px]">프론트엔드</p>
            </div>
            <div className="ml-[200px]">
              <h3 className="flex text-lg font-semibold tracking-wide h-[40px]">
                현재 상태
              </h3>
              <p className="w-[400px]">{profile && profile.user_status}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-8 border-t-2 border-gray-300" />

      {/* 기술 스텍 보여주기 */}
      <div>
        <h2 className="text-2xl font-bold">보유기술</h2>
        <span className="flex gap-3 pt-3">
          <p className="border border-red-500 rounded-full p-2 font-bold text-red-500 text-lg pr-3 pl-3">
            React
          </p>
        </span>
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>

      {/* 간단 소개글 */}
      <div>
        <h2 className="text-2xl font-bold pb-[40px]">간단 소개글</h2>
        <p className="p-[10px] resize-none rounded-md w-full">
          {profile && profile.user_comment}
        </p>
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileData
