"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { deleteEducation, getEducation } from "../../api"
import { Tables } from "@/types/supabase"
import { GoPlus } from "react-icons/go"
import { HiOutlineXMark } from "react-icons/hi2"
import Checkbox from "@/components/ui/Checkbox"

const ProfileEducationForm = ({
  userId,
  setUpdatedEducationData,
  newEducationData,
  setNewEducationData,
}: {
  userId: string
  setUpdatedEducationData: Dispatch<SetStateAction<Tables<"education">[]>>
  newEducationData: any
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
        <h2 className="text-[26px] font-bold">학력</h2>
        <button
          type="button"
          onClick={handleAddNewEducationForm}
          className="flex ml-auto border-[1.5px] border-[#A6A6A6] bg-[#ffffff] text-[16px] font-[700] py-2 px-6 rounded-3xl hover:bg-[#EEEEEE] hover:border-[#000000] transition-all duration-300"
        >
          <GoPlus className="text-[25px] mx-[3px]" />
          추가하기
        </button>
      </div>
      <div>
        {education?.map((edu: Tables<"education">, index: number) => (
          <div key={index}>
            {!hiddenInputs[index] && (
              <>
                <div className="flex justify-between items-start pt-[30px]">
                  <div className="pt-[5px]">
                    <input
                      type="date"
                      value={edu.period_from as string}
                      onChange={(e) =>
                        handleInputChange(index, "period_from", e.target.value)
                      }
                      className="cursor-pointer"
                    />
                    <span> ~ </span>
                    <input
                      type="date"
                      value={edu.period_to as string}
                      onChange={(e) =>
                        handleInputChange(index, "period_to", e.target.value)
                      }
                      className="cursor-pointer"
                    />
                    <div className="flex gap-[10px] pt-[30px]">
                      {[
                        { id: "inProgress", label: "재학중", value: "1" },
                        { id: "graduated", label: "졸업", value: "2" },
                        { id: "withdrawn", label: "중퇴", value: "3" },
                        { id: "onLeave", label: "휴학", value: "4" },
                      ].map(({ id, label, value }) => (
                        <div key={id}>
                          <Checkbox
                            id={`eduCheckbox_${index}_${id}`}
                            name="graduated"
                            value={edu.graduated === value}
                            handler={() =>
                              handleInputChange(index, "graduated", value)
                            }
                          />
                          <label
                            htmlFor={`eduCheckbox_${index}_${id}`}
                            className="cursor-pointer"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={edu.school_name as string}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "school_name",
                            e.target.value,
                          )
                        }
                        className="w-[250px] text-xl font-bold p-1"
                        placeholder="학교명"
                        maxLength={10}
                      />
                      <button
                        type="button"
                        onClick={() => hideInputsAndDelete(index, edu.id)}
                        className="text-[#AAAAAA] text-[30px] hover:text-red-500"
                      >
                        <HiOutlineXMark />
                      </button>
                    </div>
                    <div className="pt-[20px]">
                      <input
                        type="text"
                        value={edu.school_major as string}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "school_major",
                            e.target.value,
                          )
                        }
                        className="p-1"
                        placeholder="전공 및 학위"
                        maxLength={10}
                      />
                    </div>
                  </div>
                </div>
                <hr className="my-8 border-t-2 border-gray-300" />
              </>
            )}
          </div>
        ))}
        {/* 새로운 학력 데이터 추가 */}
        {newEducationForms.map((form, formIndex) => (
          <div key={formIndex}>
            <div className="flex justify-between items-start pt-[30px]">
              <div className="pt-[5px]">
                <div className="flex">
                  <input
                    type="date"
                    placeholder="From"
                    value={newEducationData[formIndex]?.period_from || ""}
                    onChange={(e) =>
                      handleNewEducationInputChange(
                        formIndex,
                        "period_from",
                        e.target.value,
                      )
                    }
                    className="cursor-pointer"
                  />
                  <span> ~ </span>
                  <input
                    type="date"
                    placeholder="To"
                    value={newEducationData[formIndex]?.period_to || ""}
                    onChange={(e) =>
                      handleNewEducationInputChange(
                        formIndex,
                        "period_to",
                        e.target.value,
                      )
                    }
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex gap-[10px] pt-[30px]">
                  {[
                    { id: "inProgress", label: "재학중", value: "1" },
                    { id: "graduated", label: "졸업", value: "2" },
                    { id: "withdrawn", label: "중퇴", value: "3" },
                    { id: "onLeave", label: "휴학", value: "4" },
                  ].map(({ id, label, value }) => (
                    <div key={id}>
                      <Checkbox
                        id={`newEduCheckbox_${formIndex}_${id}`}
                        name="graduated"
                        value={newEducationData[formIndex]?.graduated === value}
                        handler={() =>
                          handleNewEducationInputChange(
                            formIndex,
                            "graduated",
                            value,
                          )
                        }
                      />
                      <label
                        htmlFor={`newEduCheckbox_${formIndex}_${id}`}
                        className="cursor-pointer"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative items-center">
                <input
                  type="text"
                  value={newEducationData[formIndex]?.school_name || ""}
                  onChange={(e) =>
                    handleNewEducationInputChange(
                      formIndex,
                      "school_name",
                      e.target.value,
                    )
                  }
                  className="w-[250px] text-xl font-bold p-1"
                  placeholder="학교명"
                  maxLength={10}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteNewEducationForm(formIndex)}
                  className="text-[#AAAAAA] text-[30px] hover:text-red-500"
                >
                  <HiOutlineXMark />
                </button>
                <div className="pt-[20px]">
                  <input
                    type="text"
                    value={newEducationData[formIndex]?.school_major || ""}
                    onChange={(e) =>
                      handleNewEducationInputChange(
                        formIndex,
                        "school_major",
                        e.target.value,
                      )
                    }
                    className="p-1"
                    placeholder="전공 및 학위"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>
            <hr className="my-8 border-t-2 border-gray-300" />
          </div>
        ))}
      </div>
    </form>
  )
}

export default ProfileEducationForm
