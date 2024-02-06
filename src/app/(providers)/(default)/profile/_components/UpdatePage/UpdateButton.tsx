"use client"

import React, { useState } from "react"
import {
  updateCareers,
  addCareer,
  updateEducation,
  addEducation,
  updateAcademies,
  addAcademy,
  updateSpecs,
  addSpec,
  addSocialLinks,
} from "../../api"
import ProfileUserDataForm from "./ProfileUserDataForm"
import ProfileCareerForm from "./ProfileCareerForm"
import ProfileEducationForm from "./ProfileEducationForm"
import ProfileAcademyForm from "./ProfileAcademyForm"
import ProfileSpecForm from "./ProfileSpecForm"
import ProfileSocialForm from "./ProfileSocialForm"
import { Tables } from "@/types/supabase"

const ProfileUpdateButton = ({ userId }: { userId: string }) => {
  // 여러 유형의 데이터를 관리하는 state 변수들을 선언
  const [updatedCareerData, setUpdatedCareerData] = useState<
    Tables<"careers">[]
  >([])
  const [newCareerData, setNewCareerData] = useState<Tables<"careers">[]>([])
  const [updatedEducationData, setUpdatedEducationData] = useState<
    Tables<"education">[]
  >([])
  const [newEducationData, setNewEducationData] = useState<
    Tables<"education">[]
  >([])
  const [updatedAcademyData, setUpdatedAcademyData] = useState<
    Tables<"academies">[]
  >([])
  const [newAcademyData, setNewAcademyData] = useState<Tables<"academies">[]>(
    [],
  )
  const [updatedSpecData, setUpdatedSpecData] = useState<Tables<"specs">[]>([])
  const [newSpecData, setNewSpecData] = useState<Tables<"specs">[]>([])
  const [newLinkData, setNewLinkData] = useState<Tables<"social_links">[]>([])

  // 업데이트 버튼 클릭 시 실행되는 함수
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 각 유형의 데이터를 업데이트하는 API 호출
    const careersResult = await updateCareers(userId, updatedCareerData)
    const educationResult = await updateEducation(userId, updatedEducationData)
    const academyResult = await updateAcademies(userId, updatedAcademyData)
    const specResult = await updateSpecs(userId, updatedSpecData)

    // 새로운 데이터를 추가하는 API 호출
    const addCareerPromises = newCareerData.map((careerData) =>
      addCareer(userId, careerData),
    )
    const addEducationPromises = newEducationData.map((educationData) =>
      addEducation(userId, educationData),
    )
    const addAcademyPromises = newAcademyData.map((academyData) =>
      addAcademy(userId, academyData),
    )
    const addSpecPromises = newSpecData.map((specData) =>
      addSpec(userId, specData),
    )
    const addLinkPromises = newLinkData.map((linkData) =>
      addSocialLinks(userId, linkData),
    )

    // 모든 Promise를 기다리고 결과를 확인하여 상태 초기화 또는 오류 처리
    const addCareerResults = await Promise.all(addCareerPromises)
    const addEducationrResults = await Promise.all(addEducationPromises)
    const addAcademyResults = await Promise.all(addAcademyPromises)
    const addSpecResults = await Promise.all(addSpecPromises)
    const addLinkResults = await Promise.all(addLinkPromises)

    if (
      careersResult &&
      educationResult &&
      academyResult &&
      specResult &&
      addCareerResults.every(Boolean) &&
      addEducationrResults.every(Boolean) &&
      addAcademyResults.every(Boolean) &&
      addSpecResults.every(Boolean) &&
      addLinkResults
    ) {
      // 모든 업데이트 및 추가가 성공하면 상태 초기화
      setUpdatedCareerData([])
      setUpdatedEducationData([])
      setUpdatedAcademyData([])
      setUpdatedSpecData([])
      setNewCareerData([])
      setNewEducationData([])
      setNewAcademyData([])
      setNewSpecData([])
      setNewLinkData([])
    } else {
      // 하나라도 실패하면 에러 메시지 출력
      console.error("Update failed")
    }
  }

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <ProfileUserDataForm userId={userId} />
        <div className="flex justify-between items-start">
          <ProfileCareerForm
            userId={userId}
            setUpdatedCareerData={setUpdatedCareerData}
            newCareerData={newCareerData}
            setNewCareerData={setNewCareerData}
          />
          <ProfileEducationForm
            userId={userId}
            setUpdatedEducationData={setUpdatedEducationData}
            newEducationData={newEducationData}
            setNewEducationData={setNewEducationData}
          />
        </div>
        <div className="flex justify-between items-start pt-[20px]">
          <ProfileAcademyForm
            userId={userId}
            setUpdatedAcademyData={setUpdatedAcademyData}
            newAcademyData={newAcademyData}
            setNewAcademyData={setNewAcademyData}
          />
          <ProfileSpecForm
            userId={userId}
            setUpdatedSpecData={setUpdatedSpecData}
            newSpecData={newSpecData}
            setNewSpecData={setNewSpecData}
          />
        </div>
        <ProfileSocialForm
          userId={userId}
          newLinkData={newLinkData}
          setNewLinkData={setNewLinkData}
        />
        <button
          type="submit"
          className="text-[15px] ml-[1135px] mt-[30px] px-4 py-2 rounded-[6px] bg-[#B8FF65] hover:bg-[#666666] hover:text-[#B8FF65]"
        >
          저장하기
        </button>
      </form>
    </div>
  )
}

export default ProfileUpdateButton
