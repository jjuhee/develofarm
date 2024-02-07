"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { deleteEducation, getEducation } from "../../api"
import { Tables } from "@/types/supabase"
import { GoPlus } from "react-icons/go"
import EducationFormInputs from "./UpdateInputs/EducationFormInputs"

const ProfileEducationForm = ({
  userId,
  setUpdatedEducationData,
  newEducationData,
  setNewEducationData,
}: {
  userId: string
  setUpdatedEducationData: Dispatch<SetStateAction<Tables<"education">[]>>
  newEducationData: Tables<"education">[]
  setNewEducationData: Dispatch<SetStateAction<Tables<"education">[]>>
}) => {
  const [newEducationForms, setNewEducationForms] = useState<
    Tables<"education">[]
  >([])
  const [hiddenInputs, setHiddenInputs] = useState<boolean[]>([])

  const {
    data: education,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["education", userId],
    queryFn: () => getEducation({ userId }),
    enabled: !!userId,
  })

  const handleInputChange = (
    index: number,
    field: keyof Tables<"education">,
    value: string | boolean,
  ) => {
    const UpdatedEducation = [...(education as Tables<"education">[])]
    ;(UpdatedEducation[index][field] as string) = value as string
    setUpdatedEducationData(UpdatedEducation)
  }

  const handleNewEducationInputChange = (
    formIndex: number,
    field: keyof Tables<"education">,
    value: string | boolean,
  ) => {
    setNewEducationData((prevData: any) => {
      const newData = [...prevData]
      newData[formIndex] = { ...newData[formIndex], [field]: value }
      return newData
    })
  }

  const handleAddNewEducationForm = () => {
    setNewEducationForms([...newEducationForms, {} as Tables<"education">])
    setNewEducationData([...newEducationData, {} as Tables<"education">])
  }

  const hideInputsAndDelete = async (index: number, educationId: string) => {
    try {
      await deleteEducation(userId, [educationId])
      setHiddenInputs((prevHiddenInputs) => {
        const newHiddenInputs = [...prevHiddenInputs]
        newHiddenInputs[index] = true
        return newHiddenInputs
      })
    } catch (error) {
      console.error("Error deleting education data:", error)
    }
  }

  const handleDeleteNewEducationForm = (formIndex: number) => {
    setNewEducationForms((prevForms) => {
      const updatedForms = [...prevForms]
      updatedForms.splice(formIndex, 1)
      return updatedForms
    })

    setNewEducationData((prevData: any) => {
      const newData = [...prevData]
      newData.splice(formIndex, 1)
      return newData
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>학력 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <form>
      <div className="flex justify-between items-start w-[570px]">
        <h2 className="text-[18px] font-bold pt-[5px]">학력</h2>
        <button
          type="button"
          onClick={handleAddNewEducationForm}
          className="flex border-[1.5px] border-[#A6A6A6] bg-[#ffffff] text-[15px] font-[700] pl-[10px] py-[5px] px-[15px] rounded-3xl hover:bg-[#EEEEEE] hover:border-[#000000] transition-all duration-300"
        >
          <GoPlus className="text-[25px] mx-[3px]" />
          추가하기
        </button>
      </div>
      <div>
        {education?.map((edu: Tables<"education">, index: number) => (
          <EducationFormInputs
            key={index}
            educationData={education}
            formIndex={index}
            isHidden={hiddenInputs[index]}
            handleInputChange={handleInputChange}
            handleDeleteForm={() => hideInputsAndDelete(index, edu.id)}
          />
        ))}
        {/* 새로운 학력 데이터 추가 */}
        {newEducationForms.map((form, formIndex) => (
          <EducationFormInputs
            key={formIndex}
            educationData={newEducationData}
            formIndex={formIndex}
            isHidden={false}
            handleInputChange={handleNewEducationInputChange}
            handleDeleteForm={() => handleDeleteNewEducationForm(formIndex)}
          />
        ))}
      </div>
    </form>
  )
}

export default ProfileEducationForm
