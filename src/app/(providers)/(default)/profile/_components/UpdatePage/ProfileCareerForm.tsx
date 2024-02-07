"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { deleteCareers, getCareers } from "../../api"
import { Tables } from "@/types/supabase"
import { GoPlus } from "react-icons/go"
import CareerFormInputs from "./UpdateInputs/CareerFormInputs"

const ProfileCareerForm = ({
  userId,
  setUpdatedCareerData,
  newCareerData,
  setNewCareerData,
}: {
  userId: string
  setUpdatedCareerData: Dispatch<SetStateAction<Tables<"careers">[]>>
  newCareerData: Tables<"careers">[]
  setNewCareerData: Dispatch<SetStateAction<Tables<"careers">[]>>
}) => {
  const [newCareerForms, setNewCareerForms] = useState<Tables<"careers">[]>([])
  const [hiddenInputs, setHiddenInputs] = useState<boolean[]>([])

  const {
    data: careers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["careers", userId],
    queryFn: () => getCareers({ userId: userId }),
    enabled: !!userId,
  })

  const handleInputChange = (
    index: number,
    field: keyof Tables<"careers">,
    value: string | boolean,
  ) => {
    const updatedCareers = [...(careers as Tables<"careers">[])]
    ;(updatedCareers[index][field] as string) = value as string
    setUpdatedCareerData(updatedCareers)
  }

  const handleNewCareerInputChange = (
    formIndex: number,
    field: keyof Tables<"careers">,
    value: string | boolean,
  ) => {
    setNewCareerData((prevData: any) => {
      const newData = [...prevData]
      newData[formIndex] = { ...newData[formIndex], [field]: value }
      return newData
    })
  }

  const handleAddNewCareerForm = () => {
    setNewCareerForms([...newCareerForms, {} as Tables<"careers">])
    setNewCareerData([...newCareerData, {} as Tables<"careers">])
  }

  const handleDeleteNewCareerForm = (formIndex: number) => {
    setNewCareerForms((prevForms) => {
      const updatedForms = [...prevForms]
      updatedForms.splice(formIndex, 1)
      return updatedForms
    })

    setNewCareerData((prevData: Tables<"careers">[]) => {
      const updatedData = [...prevData]
      updatedData.splice(formIndex, 1)
      return updatedData
    })
  }

  const hideInputsAndDelete = async (index: number, careerId: string) => {
    try {
      await deleteCareers(userId, [careerId])
      setHiddenInputs((prevHiddenInputs) => {
        const newHiddenInputs = [...prevHiddenInputs]
        newHiddenInputs[index] = true
        return newHiddenInputs
      })
    } catch (error) {
      console.error("Error deleting career data:", error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>경력 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <form>
      <div className="flex justify-between items-start w-[570px]">
        <h2 className="text-[18px] font-bold pt-[5px]">경력</h2>
        <button
          type="button"
          onClick={handleAddNewCareerForm}
          className="flex border-[1.5px] border-[#A6A6A6] bg-[#ffffff] text-[15px] font-[700] pl-[10px] py-[5px] px-[15px] rounded-3xl hover:bg-[#EEEEEE] hover:border-[#000000] transition-all duration-300"
        >
          <GoPlus className="text-[25px] mx-[3px]" />
          추가하기
        </button>
      </div>
      <div>
        {careers?.map((career: Tables<"careers">, index: number) => (
          <CareerFormInputs
            key={career.id}
            careerData={careers}
            formIndex={index}
            isHidden={hiddenInputs[index]}
            handleInputChange={handleInputChange}
            handleDeleteForm={() => hideInputsAndDelete(index, career.id)}
          />
        ))}
        {/* 새로운 경력 데이터 추가 */}
        {newCareerForms.map((form, formIndex) => (
          <CareerFormInputs
            key={formIndex}
            careerData={newCareerData}
            formIndex={formIndex}
            isHidden={false}
            handleInputChange={handleNewCareerInputChange}
            handleDeleteForm={() => handleDeleteNewCareerForm(formIndex)}
          />
        ))}
      </div>
    </form>
  )
}

export default ProfileCareerForm
