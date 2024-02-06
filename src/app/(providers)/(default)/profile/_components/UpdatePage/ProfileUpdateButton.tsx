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
import useCustomModalStore from "@/store/customModal" // Importing the custom modal store

const ProfileUpdateButton = ({ userId }: { userId: string }) => {
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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const modalStore = useCustomModalStore.getState()
    modalStore.setViewCustomModal(true)
    modalStore.setModalType("confirm")
    modalStore.setModalMessage("저장하시겠습니까?")
    modalStore.setHandler(async () => {
      modalStore.setViewCustomModal(false)

      try {
        await updateCareers(userId, updatedCareerData)
        await updateEducation(userId, updatedEducationData)
        await updateAcademies(userId, updatedAcademyData)
        await updateSpecs(userId, updatedSpecData)

        newCareerData.map((careerData) => addCareer(userId, careerData))
        newEducationData.map((educationData) =>
          addEducation(userId, educationData),
        )
        newAcademyData.map((academyData) => addAcademy(userId, academyData))
        newSpecData.map((specData) => addSpec(userId, specData))
        newLinkData.map((linkData) => addSocialLinks(userId, linkData))

        setUpdatedCareerData([])
        setUpdatedEducationData([])
        setUpdatedAcademyData([])
        setUpdatedSpecData([])
        setNewCareerData([])
        setNewEducationData([])
        setNewAcademyData([])
        setNewSpecData([])
        setNewLinkData([])

        modalStore.setViewCustomModal(true)
        modalStore.setModalType("confirm")
        modalStore.setModalMessage(
          "성공적으로 업데이트되었습니다! 확인을 누르면 프로필 페이지로 이동합니다.",
        )
        modalStore.setHandler(() => {
          window.location.href = `/profile/${userId}`
        })
      } catch (error) {
        console.error("Update error:", error)
        alert("데이터 처리 중 오류가 발생했습니다.")
      }
    })
  }

  return (
    <div>
      <ProfileUserDataForm userId={userId} />
      <form onSubmit={handleUpdate}>
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
          className="text-[15px] ml-[1100px] mt-[30px] px-4 py-2 rounded-[6px] bg-[#B8FF65] hover:bg-[#666666] hover:text-[#B8FF65]"
        >
          저장하기
        </button>
      </form>
    </div>
  )
}

export default ProfileUpdateButton
