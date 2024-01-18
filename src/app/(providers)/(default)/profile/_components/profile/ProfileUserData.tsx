import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../api"

const ProfileUserData = ({ profileId }: { profileId: string }) => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", profileId],
    queryFn: () => getUser(profileId),
    enabled: !!profileId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>유저데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <div className="pt-3">
      {/* 유저 데이터 */}
      <div className="flex items-center space-y-4 p-4">
        <img
          width={64}
          height={64}
          src={`${users?.avatar_url}`}
          alt="User Avatar"
          className="w-64 h-64 rounded-full mr-4"
        />

        <div className="text-left pl-3">
          <h2 className="w-[400px] mb-[30px] text-3xl font-semibold">
            {users?.user_nickname}
          </h2>
          <div className="flex">
            <div>
              <h3 className="flex text-lg font-semibold h-[40px]">연락처</h3>
              {users?.user_phone_number ? (
                <p>{users.user_phone_number}</p>
              ) : (
                <p>연락처 정보가 없습니다.</p>
              )}
            </div>
            <div className="ml-[200px]">
              <h3 className="flex text-lg font-semibold h-[40px] pl-[4px]">
                이메일
              </h3>
              <p className="w-[400px] pl-[8px]">{users?.user_email}</p>
            </div>
          </div>

          <div className="flex pt-3">
            <div>
              <h3 className="flex text-lg font-semibold h-[40px]">직무</h3>
              <p className="w-[400px]">프론트 엔드</p>
            </div>
            <div>
              <h3 className="flex text-lg font-semibold h-[40px]">현재 상태</h3>
              <p className="w-[400px]">구인 중</p>
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
        <p>{users?.user_comment}</p>
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileUserData
