"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { deleteSpecs, getSpecs } from "../../api"
import { Tables } from "@/types/supabase"
import { GoPlus } from "react-icons/go"
import { HiOutlineXMark } from "react-icons/hi2"

const ProfileSpecForm = ({
  userId,
  setUpdatedSpecData,
  newSpecData,
  setNewSpecData,
}: {
  userId: string
  setUpdatedSpecData: any
  newSpecData: any
  setNewSpecData: any
}) => {
  const [newSpecForms, setNewSpecForms] = useState([])
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
    field: string,
    value: string | boolean,
  ) => {
    const updatedSpecs = [...specs]
    updatedSpecs[index][field] = value
    setUpdatedSpecData(updatedSpecs)
  }

  const handleNewSpecInputChange = (
    formIndex: number,
    field: string,
    value: string | boolean,
  ) => {
    setNewSpecData((prevData: any) => {
      const newData = [...prevData]
      newData[formIndex] = { ...newData[formIndex], [field]: value }
      return newData
    })
  }

  const handleAddNewAcademyForm = () => {
    setNewSpecForms([...newSpecForms, {}])
    setNewSpecData([...newSpecData, {}])
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
      console.error("Error deleting academies data:", error)
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
      <div className="flex justify-between items-start w-[600px]">
        <h2 className="text-[26px] font-bold">자격/어학/수상</h2>
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
        {specs?.map((spec: Tables<"specs">, index: number) => (
          <div key={spec.id}>
            {!hiddenInputs[index] && (
              <>
                <div className="flex justify-between items-start pt-[30px] pb-[58px]">
                  <input
                    type="date"
                    value={spec.spec_date as string}
                    onChange={(e) =>
                      handleInputChange(index, "spec_date", e.target.value)
                    }
                    className="pt-[5px]"
                  />

                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={spec.spec_name as string}
                      onChange={(e) =>
                        handleInputChange(index, "spec_name", e.target.value)
                      }
                      className="w-[250px] text-xl font-bold p-1"
                      placeholder="활동명"
                    />

                    <button
                      type="button"
                      onClick={() => hideInputsAndDelete(index, spec.id)}
                      className="text-[#AAAAAA] text-[30px] hover:text-red-500"
                    >
                      <HiOutlineXMark />
                    </button>
                  </div>
                </div>
                <hr className="my-8 border-t-2 border-gray-300" />
              </>
            )}
          </div>
        ))}
        {newSpecForms.map((form, formIndex) => (
          <div key={formIndex}>
            <div className="flex justify-between items-start pt-[30px] pb-[58px]">
              <input
                type="date"
                placeholder="From"
                value={newSpecData[formIndex]?.spec_date || ""}
                onChange={(e) =>
                  handleNewSpecInputChange(
                    formIndex,
                    "spec_date",
                    e.target.value,
                  )
                }
                className="pt-[5px]"
              />
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={newSpecData[formIndex]?.spec_name || ""}
                  onChange={(e) =>
                    handleNewSpecInputChange(
                      formIndex,
                      "spec_name",
                      e.target.value,
                    )
                  }
                  className="w-[250px] text-xl font-bold p-1"
                  placeholder="활동명"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteNewSpecForm(formIndex)}
                  className="text-[#AAAAAA] text-[30px] hover:text-red-500"
                >
                  <HiOutlineXMark />
                </button>
              </div>
            </div>
            <hr className="my-8 border-t-2 border-gray-300" />
          </div>
        ))}
      </div>
    </form>
  )
}

export default ProfileSpecForm
