"use client"

import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUser, updateUser } from "../../api"
import { TbPointFilled } from "react-icons/tb"
import { HiOutlineXMark } from "react-icons/hi2"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const ProfileForm = ({ profileId }: { profileId: string }) => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", profileId],
    queryFn: () => getUser(profileId),
    enabled: !!profileId,
  })

  const [user, setUser] = useState({
    user_nickname: users?.user_nickname || "",
    user_phone_number: users?.user_phone_number || "",
    user_email: users?.user_email || "",
    user_comment: users?.user_comment || "",
    user_status: users?.user_status || "",
  })

  const userStatusOptions = [
    {
      label: "휴식 중",
      icon: <TbPointFilled className="text-[#AAAAAA] text-3xl" />,
    },
    {
      label: "지원 중",
      icon: <TbPointFilled className="text-[#80E500] text-3xl" />,
    },
    {
      label: "참여 중",
      icon: <TbPointFilled className="text-[#000000] text-3xl" />,
    },
  ]

  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    fieldName: string,
  ) => {
    setUser((prevUser) => ({ ...prevUser, [fieldName]: e.target.value }))
  }

  const handleClear = (fieldName: string) => {
    setUser((prevUser) => ({ ...prevUser, [fieldName]: "" }))
  }

  const handleUpdateProfile = async () => {
    try {
      await updateUser(profileId, user)
      console.log("User profile updated successfully!")
    } catch (error) {
      console.error("Error updating user profile:", error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>유저데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <div className="pt-3">
      <div className="flex items-center">
        <img
          width={64}
          height={64}
          src={`${users?.avatar_url}`}
          alt="User Avatar"
          className="w-64 h-64 rounded-full"
        />

        <div className="text-left pl-[40px]">
          <div className="h-[100px] pl-[10px] relative">
            <p className="text-[18px] pb-[10px] font-semibold">닉네임</p>
            <div className="relative">
              <input
                type="text"
                name="userNickname"
                value={user.user_nickname}
                onChange={(e) => handleChange(e, "user_nickname")}
                className="border border-[#CCCCCC] rounded-full pl-[25px] font-bold text-[20px] w-[872px] h-[48px]"
                placeholder="닉네임을 입력하세요..."
              />
              <button
                className="absolute right-[15px] top-[10px] text-[#AAAAAA] text-[30px] hover:text-red-500"
                onClick={() => handleClear("user_nickname")}
              >
                <HiOutlineXMark />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center w-[700px]">
            <div className="p-[10px]">
              <div className="h-[100px] relative">
                <p className="text-[18px] pb-[10px] font-semibold">연락처</p>
                <div className="relative">
                  <input
                    type="text"
                    name="userPhoneNumber"
                    value={user.user_phone_number}
                    onChange={(e) => handleChange(e, "user_phone_number")}
                    className="border border-[#CCCCCC] rounded-full pl-[25px] font-bold text-[20px] w-[431px] h-[48px]"
                    placeholder="연락처를 입력하세요..."
                  />
                  <button
                    className="absolute right-[15px] top-[10px] text-[#AAAAAA] text-[30px] hover:text-red-500"
                    onClick={() => handleClear("user_phone_number")}
                  >
                    <HiOutlineXMark />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[18px] pb-[10px] font-semibold">직무</p>
                {users?.positions?.name ? (
                  <p className="text-[20px] font-bold">
                    {users.positions.name}
                  </p>
                ) : (
                  <p className="text-[20px] font-semibold">
                    직무 정보가 없습니다.
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="h-[100px] relative">
                <p className="text-[18px] pb-[10px] font-semibold">이메일</p>
                <div className="relative">
                  <input
                    type="text"
                    name="user_email"
                    value={user.user_email}
                    onChange={(e) => handleChange(e, "user_email")}
                    className="border border-[#CCCCCC] rounded-full pl-[25px] font-bold text-[20px] w-[431px] h-[48px]"
                    placeholder="이메일을 입력하세요..."
                  />
                  <button
                    className="absolute right-[15px] top-[10px] text-[#AAAAAA] text-[30px] hover:text-red-500"
                    onClick={() => handleClear("user_email")}
                  >
                    <HiOutlineXMark />
                  </button>
                </div>
              </div>
              <div>
                <div className="h-[100px]">
                  <p className="text-[18px] pb-[10px] font-semibold">
                    유저 상태
                  </p>
                  <div className="relative">
                    <div
                      className="border border-[#CCCCCC] rounded-full pl-[25px] font-bold text-[20px] w-[431px] h-[48px] flex items-center justify-beteewn cursor-pointer"
                      onClick={toggleDropdown}
                    >
                      {
                        userStatusOptions.find(
                          (option) => option.label === user.user_status,
                        )?.icon
                      }
                      <span className="ml-2">{user.user_status}</span>
                      {isDropdownOpen ? (
                        <IoIosArrowUp className="ml-[260px]" />
                      ) : (
                        <IoIosArrowDown className="ml-[260px]" />
                      )}
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-[431px] font-bold text-[18px] bg-white border border-[#CCCCCC] rounded-[20px] overflow-hidden">
                        <ul>
                          {userStatusOptions.map((option) => (
                            <li
                              key={option.label}
                              onClick={() => {
                                setUser((prevUser) => ({
                                  ...prevUser,
                                  user_status: option.label,
                                }))
                                toggleDropdown()
                              }}
                              className="py-2 px-4 cursor-pointer hover:bg-gray-200 flex items-center"
                            >
                              {option.icon}{" "}
                              <span className="ml-2">{option.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-8 border-t-2 border-gray-300" />

      <div>
        <h2 className="text-[26px] font-bold">보유기술</h2>
        {users?.user_tech && users.user_tech.length > 0 ? (
          <span className="flex gap-3 pt-3">
            {users.user_tech.map((tech) => (
              <p
                key={tech.techs?.tech_name}
                className="border border-[#297A5F] rounded-full p-2 font-bold text-[#297A5F] text-lg pr-3 pl-3"
              >
                {tech.techs?.tech_name}
              </p>
            ))}
          </span>
        ) : (
          <p className="pt-[30px]">보유 기술이 없습니다.</p>
        )}
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>

      <div className="relative">
        <h2 className="text-[26px] font-bold pb-[10px]">간단 소개글</h2>
        <div className="relative">
          <textarea
            name="user_comment"
            value={user.user_comment}
            onChange={(e) => handleChange(e, "user_comment")}
            className="border border-[#CCCCCC] rounded-[5px] p-2 text-[16px] w-[1230px] h-[120px]"
            placeholder="간단한 소개글을 입력하세요..."
          />
          <button
            className="text-[#AAAAAA] text-[30px] hover:text-red-500 absolute right-[12px] bottom-[20px]"
            onClick={() => handleClear("user_comment")}
          >
            <HiOutlineXMark />
          </button>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full"
        onClick={handleUpdateProfile}
      >
        Update Profile
      </button>
      <hr className="my-8 border-t-2 border-gray-300" />
    </div>
  )
}

export default ProfileForm
