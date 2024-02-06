"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { deleteAcademies, getAcademy } from "../../api"
import { Tables } from "@/types/supabase"
import { GoPlus } from "react-icons/go"
import { HiOutlineXMark } from "react-icons/hi2"
import AcademyFormInputs from "./UpdateInputs/AcademyFormInputs "

const ProfileAcademyForm = ({
  userId,
  setUpdatedAcademyData,
  newAcademyData,
  setNewAcademyData,
}: {
  userId: string
  setUpdatedAcademyData: Dispatch<SetStateAction<Tables<"academies">[]>>
  newAcademyData: any
  setNewAcademyData: Dispatch<SetStateAction<Tables<"academies">[]>>
}) => {
  const [newAcademyForms, setNewAcademyForms] = useState<Tables<"academies">[]>(
    [],
  )
  const [hiddenInputs, setHiddenInputs] = useState<boolean[]>([])

  const {
    data: academies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["academies", userId],
    queryFn: () => getAcademy({ userId: userId }),
    enabled: !!userId,
  })

  const handleInputChange = (
    index: number,
    field: keyof Tables<"academies">,
    value: string | boolean,
  ) => {
    const updatedAcademies = [...(academies as Tables<"academies">[])]
    ;(updatedAcademies[index][field] as string) = value as string
    setUpdatedAcademyData(updatedAcademies)
  }

  const handleNewAcademyInputChange = (
    formIndex: number,
    field: keyof Tables<"academies">,
    value: string | boolean,
  ) => {
    setNewAcademyData((prevData: any) => {
      const newData = [...prevData]
      newData[formIndex] = { ...newData[formIndex], [field]: value }
      return newData
    })
  }

  const handleAddNewAcademyForm = () => {
    setNewAcademyForms([...newAcademyForms, {} as Tables<"academies">])
    setNewAcademyData([...newAcademyData, {} as Tables<"academies">])
  }

  const hideInputsAndDelete = async (index: number, academyId: string) => {
    try {
      await deleteAcademies(userId, [academyId])
      setHiddenInputs((prevHiddenInputs) => {
        const newHiddenInputs = [...prevHiddenInputs]
        newHiddenInputs[index] = true
        return newHiddenInputs
      })
    } catch (error) {
      console.error("Error deleting academies data:", error)
    }
  }

  const handleDeleteNewAcademyForm = (formIndex: number) => {
    setNewAcademyForms((prevForms) => {
      const updatedForms = [...prevForms]
      updatedForms.splice(formIndex, 1)
      return updatedForms
    })

    setNewAcademyData((prevData: any) => {
      const updatedData = [...prevData]
      updatedData.splice(formIndex, 1)
      return updatedData
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>교육/활동 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  return (
    <form>
      <div className="flex justify-between items-start w-[570px]">
        <h2 className="text-[26px] font-bold">교육/활동</h2>
        <button
          type="button"
          onClick={handleAddNewAcademyForm}
          className="flex ml-auto border-[1.5px] border-[#A6A6A6] bg-[#ffffff] text-[16px] font-[700] py-2 px-6 rounded-3xl hover:bg-[#EEEEEE] hover:border-[#000000] transition-all duration-300"
        >
          <GoPlus className="text-[25px] mx-[3px]" />
          추가하기
        </button>
      </div>
      <div>
        {academies?.map((academy: Tables<"academies">, index: number) => (
          <AcademyFormInputs
            key={academy.id}
            academyData={academies}
            formIndex={index}
            isHidden={hiddenInputs[index]}
            handleInputChange={handleInputChange}
            handleDeleteForm={() => hideInputsAndDelete(index, academy.id)}
          />
        ))}
        {/* 새로운 교육/활동 데이터 추가 */}
        {newAcademyForms.map((form, formIndex) => (
          <AcademyFormInputs
            key={formIndex}
            academyData={newAcademyData}
            formIndex={formIndex}
            isHidden={false}
            handleInputChange={handleNewAcademyInputChange}
            handleDeleteForm={() => handleDeleteNewAcademyForm(formIndex)}
          />
        ))}
      </div>
    </form>
  )
}

export default ProfileAcademyForm
