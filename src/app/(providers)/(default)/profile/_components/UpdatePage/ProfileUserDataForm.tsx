"use client"

import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  getUser,
  updateUser,
  getPositions,
  getPositionTechs,
  addUserTech,
} from "../../api"
import { TbPointFilled } from "react-icons/tb"
import { HiOutlineXMark } from "react-icons/hi2"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import useCustomModalStore from "@/store/customModal"
import Checkbox from "@/components/ui/Checkbox"
import Image from "next/image"

const ProfileUserDataForm = ({ userId }: { userId: string }) => {
  // 유저 정보 및 데이터 상태 관리
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  })

  // 직무 및 기술 데이터 상태 관리
  const {
    data: positions,
    isLoading: positionsLoading,
    isError: positionsError,
  } = useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
  })

  // 직무 기술 데이터 상태 관리
  const { data: positionTechs } = useQuery({
    queryKey: ["position_tech"],
    queryFn: getPositionTechs,
  })

  // 유저 정보 상태 관리
  const [user, setUser] = useState({
    user_nickname: users?.user_nickname || "",
    user_phone_number: users?.user_phone_number || "",
    user_email: users?.user_email || "",
    user_comment: users?.user_comment || "",
    user_status: users?.user_status || "",
    positionId: users?.positionId || "",
  })

  // 유저 상태 옵션
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

  // 선택된 직무 및 관련 상태 관리
  const [selectedPositionId, setSelectedPositionId] = useState(user.positionId)
  const [isPositionDropdownOpen, setPositionDropdownOpen] = useState(false)
  const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false)

  // 선택된 기술 관리
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])

  // 유저 기술 초기화
  useEffect(() => {
    const techs = users?.user_tech?.map((tech) => tech.tech_id)
    if (techs) setSelectedTechs([...techs])
  }, [users])

  // 기술 체크박스 변경 처리
  const handleTechCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    techId: string,
  ) => {
    if (e.target.checked) {
      // 이미 선택된 경우 제외하고 업데이트
      const updatedTechs = selectedTechs.filter(
        (techId) => techId !== e.target.id,
      )
      setSelectedTechs([...updatedTechs, e.target.id])
    } else {
      // 체크 해제 됐을 경우 삭제
      const updatedTechs = selectedTechs.filter(
        (techId) => techId !== e.target.id,
      )
      setSelectedTechs([...updatedTechs])
    }
    setPositionDropdownOpen(true)
  }

  // 유저 기술 추가 처리
  const handleAddUserTech = async () => {
    try {
      const techData = selectedTechs.map((techId) => ({
        user_id: userId,
        tech_id: techId,
      }))
      await addUserTech(techData, userId)
      console.log("사용자 기술 데이터가 성공적으로 추가되었습니다!")
    } catch (error) {
      console.error("사용자 기술 데이터 추가 중 오류 발생:", error)
    }
  }

  // 유저 프로필 업데이트 처리
  const handleUpdateProfile = async () => {
    try {
      await updateUser(userId, user)
      console.log("사용자 프로필 수정이 성공적으로 업데이트되었습니다!")
    } catch (error) {
      console.error("사용자 프로필 수정 중 오류가 발생했습니다:", error)
    }
  }

  // 유저 프로필 업데이트 및 기술 추가 통합 처리
  const handleCombinedAction = async () => {
    const modalStore = useCustomModalStore.getState()
    modalStore.setViewCustomModal(true)
    modalStore.setModalType("confirm")
    modalStore.setModalMessage("저장하시겠습니까?")
    modalStore.setHandler(async () => {
      modalStore.setViewCustomModal(false)

      // 유저 닉네임이 비어있지 않은지 확인
      if (!user.user_nickname.trim()) {
        modalStore.setViewCustomModal(true)
        modalStore.setModalType("alert")
        modalStore.setModalMessage("닉네임을 입력하세요.")
        return
      }

      try {
        await handleUpdateProfile()
        await handleAddUserTech()

        modalStore.setViewCustomModal(true)
        modalStore.setModalType("confirm")
        modalStore.setModalMessage(
          "사용자 프로필이 성공적으로 업데이트되었습니다! 확인을 누르면 프로필 페이지로 이동합니다.",
        )
        modalStore.setHandler(() => {
          modalStore.setViewCustomModal(false)
          window.location.href = `/profile/${userId}`
        })
      } catch (error) {
        console.error("사용자 프로필 업데이트 중 오류가 발생했습니다:", error)
        modalStore.setViewCustomModal(true)
        modalStore.setModalType("error")
        modalStore.setModalMessage("오류가 발생하여 업데이트에 실패했습니다.")
        modalStore.setHandler(() => {
          modalStore.setViewCustomModal(false)
        })
      }
    })
  }

  // 직무 및 기술 드롭다운 토글
  const togglePositionDropdown = () => {
    setPositionDropdownOpen((prev) => !prev)
  }

  // 유저 상태 드롭다운 토글
  const toggleStatusDropdown = () => {
    setStatusDropdownOpen((prev) => !prev)
  }

  // 입력값 변경 처리
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    fieldName: string,
  ) => {
    setUser((prevUser) => ({ ...prevUser, [fieldName]: e.target.value }))
  }

  // 입력값 초기화 처리
  const handleClear = (fieldName: string) => {
    setUser((prevUser) => ({ ...prevUser, [fieldName]: "" }))
  }

  // 직무 선택 처리
  const handlePositionSelection = (positionId: string) => {
    setSelectedPositionId(positionId)
    setUser((prevUser) => ({ ...prevUser, positionId }))
  }

  if (isLoading || positionsLoading) {
    return <div>Loading...</div>
  }

  if (isError || positionsError) {
    return <div>유저 데이터 정보를 불러오는 중 오류가 발생했습니다.</div>
  }

  return (
    <div className="pt-3">
      <div className="flex items-center">
        <Image
          src={users?.avatar_url as string}
          alt="userAvatar"
          width={273}
          height={273}
          objectFit="cover"
          className="rounded-full"
        />
        <div className="text-left pl-[40px]">
          <div className="h-[100px] pl-[10px] relative">
            <p className="text-[16px] pb-[10px] font-semibold">닉네임</p>
            <div className="relative">
              <input
                type="text"
                name="userNickname"
                value={user.user_nickname}
                onChange={(e) => handleChange(e, "user_nickname")}
                className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[16px] w-[847px] h-[48px] hover:border-[#000000]"
                placeholder="닉네임을 입력하세요."
                maxLength={10}
              />
              <button
                className="absolute right-[15px] top-[10px] text-[#AAAAAA] text-[30px] hover:text-red-500"
                onClick={() => handleClear("user_nickname")}
              >
                <HiOutlineXMark />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="p-[10px]">
              <div className="h-[100px] relative">
                <p className="text-[16px] pb-[10px] font-semibold">연락처</p>
                <div className="relative">
                  <input
                    type="text"
                    name="userPhoneNumber"
                    value={user.user_phone_number}
                    onChange={(e) => handleChange(e, "user_phone_number")}
                    className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[16px] w-[413.5px] h-[48px] hover:border-[#000000]"
                    placeholder="- 를 넣어서 입력하세요."
                    maxLength={13}
                  />
                  <button
                    className="absolute right-[5px] top-[10px] text-[#AAAAAA] text-[30px] hover:text-red-500"
                    onClick={() => handleClear("user_phone_number")}
                  >
                    <HiOutlineXMark />
                  </button>
                </div>
              </div>

              <div className="h-[100px] relative">
                <p className="text-[16px] pb-[10px] font-semibold">
                  직무 및 기술
                </p>
                <ul className="flex gap-[13px] pb-[13px]">
                  {positions?.map((position) => (
                    <li
                      key={position.id}
                      className={`border border-[#CCCCCC] rounded-[8px] gap-[15px] font-bold text-[14px] w-[128px] h-[37px] flex items-center justify-center cursor-pointer hover:border-[#000000] ${
                        selectedPositionId === position.id
                          ? "bg-[#B8FF65] text-[#000000] hover:bg-[#B8FF65] hover:text-[#000000]  transition-all duration-300 border-none"
                          : ""
                      }`}
                      onClick={() => {
                        handlePositionSelection(position.id)
                        togglePositionDropdown()
                      }}
                    >
                      {position.name}
                      {isPositionDropdownOpen ? (
                        <IoIosArrowUp className="text-[20px]" />
                      ) : (
                        <IoIosArrowDown className="text-[20px]" />
                      )}
                      {selectedPositionId === position.id &&
                        isPositionDropdownOpen && (
                          <div className="absolute top-[77px] left-0 w-[410px] font-bold text-[18px] bg-white border border-[#CCCCCC] rounded-[12px] overflow-hidden">
                            <ul>
                              {positionTechs
                                ?.filter(
                                  (tech) => tech.position_id === position.id,
                                )
                                .map((tech) => (
                                  <li
                                    key={tech.id}
                                    className="py-1 px-4 flex items-center text-black"
                                  >
                                    <Checkbox
                                      id={tech.techs?.id as string}
                                      value={selectedTechs.some(
                                        (id) => id === tech.techs?.id,
                                      )}
                                      handler={(e) =>
                                        handleTechCheckboxChange(
                                          e,
                                          tech.techs?.id as string,
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={tech.techs?.id}
                                      className="ml-2 text-[14px]"
                                    >
                                      {tech.techs?.tech_name}
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className=" pl-[10px] h-[100px] relative">
                <p className="text-[16px] pb-[10px] font-semibold">이메일</p>
                <div className="relative">
                  <input
                    type="text"
                    name="user_email"
                    value={user.user_email}
                    onChange={(e) => handleChange(e, "user_email")}
                    className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[16px] w-[413.5px] h-[48px] hover:border-[#000000]"
                    placeholder="이메일을 입력하세요."
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
                <div className="pl-[10px] h-[100px]">
                  <p className="text-[16px] pb-[10px] font-semibold">
                    상태 업데이트
                  </p>
                  <div className="relative">
                    <div
                      className="border border-[#CCCCCC] rounded-[12px] pl-[25px] font-bold text-[14px] w-[417px] h-[37px] flex items-center justify-beteewn cursor-pointer hover:border-[#000000]"
                      onClick={toggleStatusDropdown}
                    >
                      {
                        userStatusOptions.find(
                          (option) => option.label === user.user_status,
                        )?.icon
                      }
                      <span className="ml-2">{user.user_status}</span>
                      {isStatusDropdownOpen ? (
                        <IoIosArrowUp className="ml-[280px] text-[20px]" />
                      ) : (
                        <IoIosArrowDown className="ml-[280px] text-[20px]" />
                      )}
                    </div>

                    {isStatusDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-[417px] font-bold text-[14px] bg-white border border-[#CCCCCC] rounded-[12px] overflow-hidden">
                        <ul>
                          {userStatusOptions.map((option) => (
                            <li
                              key={option.label}
                              onClick={() => {
                                setUser((prevUser) => ({
                                  ...prevUser,
                                  user_status: option.label,
                                }))
                                toggleStatusDropdown()
                              }}
                              className="py-2 px-4 cursor-pointer hover:bg-[#DBFFB2] flex items-center"
                            >
                              {option.icon}
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
        <h2 className="text-[18px] font-bold">보유기술</h2>
        {positions?.map((position) => (
          <div className="flex gap-3 pt-3" key={position.id}>
            {positionTechs
              ?.filter((tech) => tech.position_id === position.id)
              .map(
                (tech) =>
                  selectedTechs.includes(tech.techs?.id as string) && (
                    <span key={tech.id}>
                      <p className="bottom-0 right-2 border-none bg-[#E6E6E6] text-[16px] font-[700] py-2 px-6 rounded-full">
                        {tech.techs?.tech_name}
                      </p>
                    </span>
                  ),
              )}
          </div>
        ))}
        <hr className="my-5 border-t-2 border-gray-300" />
      </div>

      <div className="relative">
        <h2 className="text-[18px] font-bold pb-[10px]">간단 소개글</h2>
        <div className="relative">
          <textarea
            name="user_comment"
            value={user.user_comment}
            onChange={(e) => handleChange(e, "user_comment")}
            className="border border-[#CCCCCC] rounded-[5px] p-2 text-[16px] w-[1180px] h-[134px]"
            placeholder="간단한 소개글을 입력하세요."
            maxLength={200}
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
        className="text-[15px] w-[100px] h-[36px] font-bold ml-[1080px] mt-[30px] px-4 py-2 rounded-[6px] bg-[#B8FF65] hover:bg-[#666666] hover:text-[#B8FF65]"
        onClick={handleCombinedAction}
      >
        저장하기
      </button>

      <hr className="my-8 border-t-2 border-gray-300" />
    </div>
  )
}

export default ProfileUserDataForm
