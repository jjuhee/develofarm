"use client"

import React, { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  getEducation,
  updateEducation,
  addEducation,
  deleteEducation,
} from "../../api"
import { HiOutlineXMark } from "react-icons/hi2"
import useCustomModalStore from "@/store/customModal"

const ProfileEducationForm = ({ profileId }: { profileId: string }) => {
  const {
    data: education,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["education", profileId],
    queryFn: () => getEducation({ userId: profileId }),
    enabled: !!profileId,
  })

  // 폼 데이터의 기본값 정의
  const defaultFormData = {
    period_from: "",
    period_to: "",
    graduated: "",
    school_name: "",
    school_major: "",
  }

  // 폼 데이터의 상태를 관리하는 useState
  const [formData, setFormData] = useState(defaultFormData)

  // Education 데이터가 성공적으로 불러와지면 폼 데이터 업데이트
  useEffect(() => {
    if (education && education.length > 0) {
      const { period_from, period_to, graduated, school_name, school_major } =
        education[0]
      setFormData({
        period_from: period_from || "",
        period_to: period_to || "",
        graduated: graduated || "",
        school_name: school_name || "",
        school_major: school_major || "",
      })
    }
  }, [education])

  // Input 값 변경 시 폼 데이터 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Education 데이터 추가 또는 업데이트 후 데이터 다시 불러오기
  const handleCombinedAction = async () => {
    const actionFn =
      education && education.length > 0 ? updateEducation : addEducation
    await actionFn(profileId, formData)
    refetch()
  }

  const customModalStore = useCustomModalStore()

  // 최종학력 데이터 삭제 후 폼 데이터 초기화
  const handleDeleteAndClear = async () => {
    customModalStore.setModalMessage("최종학력 내용을 삭제하시겠습니까?")
    customModalStore.setModalType("confirm")
    customModalStore.setViewCustomModal(true)

    customModalStore.setHandler(async () => {
      // 사용자가 확인하면 삭제 작업 진행
      if (education && education.length > 0) {
        const educationIdToDelete = education[0].id
        const result = await deleteEducation(profileId, [educationIdToDelete])

        if (result) {
          console.log("최종학력 데이터가 성공적으로 삭제되었습니다.")
          refetch()
        } else {
          console.error("최종학력 데이터를 삭제하는 중 오류가 발생했습니다.")
        }
      }

      setFormData(defaultFormData)

      // 사용자 정의 모달 닫기
      customModalStore.setViewCustomModal(false)
    })
  }

  // 로딩 중인 경우 로딩 메시지 표시
  if (isLoading) {
    return <div>Loading...</div>
  }

  // 에러 발생 시 에러 메시지 표시
  if (isError) {
    return <div>최종학력 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <div>
          <h2 className="text-[26px] font-bold">최종학력</h2>
        </div>

        <div className="flex justify-between items-start pt-[35px]">
          <div>
            <div className="flex">
              <input
                type="date"
                name="period_from"
                value={formData.period_from}
                onChange={handleInputChange}
              />
              <span> ~ </span>
              <input
                type="date"
                name="period_to"
                value={formData.period_to}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex pt-[10px] gap-[5px]">
              {[
                { id: "inProgress", label: "재학중", value: "1" },
                { id: "graduated", label: "졸업", value: "2" },
                { id: "withdrawn", label: "중퇴", value: "3" },
                { id: "onLeave", label: "휴학", value: "4" },
              ].map(({ id, label, value }) => (
                <div key={id}>
                  <input
                    type="checkbox"
                    id={id}
                    name="graduated"
                    value={value}
                    checked={formData.graduated === value}
                    onChange={handleInputChange}
                    className="mr-[5px] accent-[#AAAAAA]"
                  />
                  <label htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex">
              <input
                type="text"
                name="school_name"
                value={formData.school_name}
                onChange={handleInputChange}
                className="w-[250px] text-xl font-bold p-1"
                placeholder="학교명"
              />
              <button
                onClick={handleDeleteAndClear}
                className="bottom-[40px] text-[#AAAAAA] text-[30px] hover:text-red-500"
              >
                <HiOutlineXMark />
              </button>
            </div>

            <div className="pt-[10px]">
              <input
                type="text"
                name="school_major"
                value={formData.school_major}
                onChange={handleInputChange}
                className="p-1"
                placeholder="전공 및 학위"
              />
            </div>
          </div>
        </div>

        <hr className="my-8 border-t-2 border-gray-300" />

        <button
          onClick={handleCombinedAction}
          className="text-[15px] ml-[480px] mb-[30px] px-4 py-2 rounded-[6px] bg-[#B8FF65] hover:bg-[#666666] hover:text-[#B8FF65]"
        >
          내용 저장하기
        </button>
      </div>
    </div>
  )
}

export default ProfileEducationForm
