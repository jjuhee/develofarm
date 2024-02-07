"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { deleteSpecs, getSpecs } from "../../api"
import { Tables } from "@/types/supabase"
import { GoPlus } from "react-icons/go"
import SpecFormInputs from "./UpdateInputs/SpecFormInputs "

const ProfileSpecForm = ({
  userId,
  setUpdatedSpecData,
  newSpecData,
  setNewSpecData,
}: {
  userId: string
  setUpdatedSpecData: Dispatch<SetStateAction<Tables<"specs">[]>>
  newSpecData: any
  setNewSpecData: Dispatch<SetStateAction<Tables<"specs">[]>>
}) => {
  const [newSpecForms, setNewSpecForms] = useState<Tables<"specs">[]>([])
  const [hiddenInputs, setHiddenInputs] = useState<boolean[]>([])

  const {
    data: specs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["specs", userId],
    queryFn: () => getSpecs({ userId: userId }),
    enabled: !!userId,
  })

  const handleInputChange = (
    index: number,
    field: keyof Tables<"specs">,
    value: string | boolean,
  ) => {
    const updatedSpecs = [...(specs as Tables<"specs">[])]
    ;(updatedSpecs[index][field] as string) = value as string
    setUpdatedSpecData(updatedSpecs)
  }

  const handleNewSpecInputChange = (
    formIndex: number,
    field: keyof Tables<"specs">,
    value: string | boolean,
  ) => {
    setNewSpecData((prevData: any) => {
      const newData = [...prevData]
      newData[formIndex] = { ...newData[formIndex], [field]: value }
      return newData
    })
  }

  const handleAddNewSpecForm = () => {
    setNewSpecForms([...newSpecForms, {} as Tables<"specs">])
    setNewSpecData([...newSpecData, {} as Tables<"specs">])
  }

  const handleDeleteNewSpecForm = (formIndex: number) => {
    setNewSpecForms((prevForms) => {
      const updatedForms = [...prevForms]
      updatedForms.splice(formIndex, 1)
      return updatedForms
    })

    setNewSpecData((prevData: any) => {
      const updatedData = [...prevData]
      updatedData.splice(formIndex, 1)
      return updatedData
    })
  }

  const hideInputsAndDelete = async (index: number, specId: string) => {
    try {
      await deleteSpecs(userId, [specId])
      setHiddenInputs((prevHiddenInputs) => {
        const newHiddenInputs = [...prevHiddenInputs]
        newHiddenInputs[index] = true
        return newHiddenInputs
      })
    } catch (error) {
      console.error("Error deleting specs data:", error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>자격/어학/수상 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <form>
      <div className="flex justify-between items-start w-[570px]">
        <h2 className="text-[18px] font-bold pt-[5px]">자격/어학/수상</h2>
        <button
          type="button"
          onClick={handleAddNewSpecForm}
          className="flex border-[1.5px] border-[#A6A6A6] bg-[#ffffff] text-[15px] font-[700] pl-[10px] py-[5px] px-[15px] rounded-3xl hover:bg-[#EEEEEE] hover:border-[#000000] transition-all duration-300"
        >
          <GoPlus className="text-[25px] mx-[3px]" />
          추가하기
        </button>
      </div>
      <div>
        {specs?.map((spec: Tables<"specs">, index: number) => (
          <SpecFormInputs
            key={spec.id}
            specData={specs}
            formIndex={index}
            isHidden={hiddenInputs[index]}
            handleInputChange={handleInputChange}
            handleDeleteForm={() => hideInputsAndDelete(index, spec.id)}
          />
        ))}
        {newSpecForms.map((form, formIndex) => (
          <SpecFormInputs
            key={formIndex}
            specData={newSpecData}
            formIndex={formIndex}
            isHidden={false}
            handleInputChange={handleNewSpecInputChange}
            handleDeleteForm={() => handleDeleteNewSpecForm(formIndex)}
          />
        ))}
      </div>
    </form>
  )
}

export default ProfileSpecForm
