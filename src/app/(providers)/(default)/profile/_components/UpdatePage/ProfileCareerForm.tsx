"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { deleteCareers, getCareers } from "../../api"
import { Tables } from "@/types/supabase"
import { GoPlus } from "react-icons/go"
import { HiOutlineXMark } from "react-icons/hi2"
import Checkbox from "@/components/ui/Checkbox"

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
  // 새로운 경력 관련 양식과 숨겨진 입력 상태 변수 선언
  const [newCareerForms, setNewCareerForms] = useState<Tables<"careers">[]>([])
  const [hiddenInputs, setHiddenInputs] = useState<boolean[]>([])

  // 경력 데이터를 불러오는 쿼리 훅 사용
  const {
    data: careers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["careers", userId],
    queryFn: () => getCareers({ userId: userId }),
    enabled: !!userId,
  })

  // 입력값이 변경될 때 호출되는 함수
  const handleInputChange = (
    index: number,
    field: keyof Tables<"careers">,
    value: string | boolean,
  ) => {
    const updatedCareers = [...(careers as Tables<"careers">[])]
    ;(updatedCareers[index][field] as string) = value as string
    setUpdatedCareerData(updatedCareers)
  }

  // 새로운 경력 데이터 입력값 변경 시 호출되는 함수
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

  // 새로운 경력 데이터 양식 추가 시 호출되는 함수
  const handleAddNewCareerForm = () => {
    setNewCareerForms([...newCareerForms, {} as Tables<"careers">])
    setNewCareerData([...newCareerData, {} as Tables<"careers">])
  }

  // 새로운 경력 데이터 양식 삭제 시 호출되는 함수
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

  // 입력값을 숨기고 해당 데이터를 삭제하는 함수
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
        <h2 className="text-[26px] font-bold">경력</h2>
        <button
          type="button"
          onClick={handleAddNewCareerForm}
          className="flex ml-auto border-[1.5px] border-[#A6A6A6] bg-[#ffffff] text-[16px] font-[700] py-2 px-6 rounded-3xl hover:bg-[#EEEEEE] hover:border-[#000000] transition-all duration-300"
        >
          <GoPlus className="text-[25px] mx-[3px]" />
          추가하기
        </button>
      </div>
      <div>
        {careers?.map((career: Tables<"careers">, index: number) => (
          <div key={career.id}>
            {!hiddenInputs[index] && (
              <>
                <div className="flex justify-between items-start pt-[30px]">
                  <div className="pt-[5px]">
                    <input
                      type="date"
                      value={career.period_from as string}
                      onChange={(e) =>
                        handleInputChange(index, "period_from", e.target.value)
                      }
                      className="cursor-pointer"
                    />
                    <span> ~ </span>
                    <input
                      type="date"
                      value={career.period_to as string}
                      onChange={(e) =>
                        handleInputChange(index, "period_to", e.target.value)
                      }
                      className="cursor-pointer"
                    />
                    <div className="pt-[30px]">
                      <label
                        htmlFor={`employed_status_${index}`}
                        className="cursor-pointer"
                      >
                        <Checkbox
                          id={`employed_status_${index}`}
                          value={career.employed_status}
                          handler={(e) =>
                            handleInputChange(
                              index,
                              "employed_status",
                              e.target.checked,
                            )
                          }
                        />
                        재직중
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={career.company_name as string}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "company_name",
                            e.target.value,
                          )
                        }
                        className="w-[250px] text-xl font-bold p-1"
                        placeholder="회사명"
                        maxLength={10}
                      />
                      <button
                        type="button"
                        onClick={() => hideInputsAndDelete(index, career.id)}
                        className="text-[#AAAAAA] text-[30px] hover:text-red-500"
                      >
                        <HiOutlineXMark />
                      </button>
                    </div>
                    <div className="pt-[20px]">
                      <input
                        type="text"
                        value={career.responsibility as string}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "responsibility",
                            e.target.value,
                          )
                        }
                        className="p-1"
                        placeholder="담당직무"
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
        {/* 새로운 경력 데이터 추가 */}
        {newCareerForms.map((form, formIndex) => (
          <div key={formIndex}>
            <div className="flex justify-between items-start pt-[30px]">
              <div className="pt-[5px]">
                <input
                  type="date"
                  placeholder="From"
                  value={newCareerData[formIndex]?.period_from || ""}
                  onChange={(e) =>
                    handleNewCareerInputChange(
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
                  value={newCareerData[formIndex]?.period_to || ""}
                  onChange={(e) =>
                    handleNewCareerInputChange(
                      formIndex,
                      "period_to",
                      e.target.value,
                    )
                  }
                  className="cursor-pointer"
                />
                <div className="pt-[35px]">
                  <label
                    htmlFor={`employed_status_new_${formIndex}`}
                    className="cursor-pointer"
                  >
                    <Checkbox
                      id={`employed_status_new_${formIndex}`}
                      value={newCareerData[formIndex]?.employed_status || false}
                      handler={(e) =>
                        handleNewCareerInputChange(
                          formIndex,
                          "employed_status",
                          e.target.checked,
                        )
                      }
                    />
                    재직중
                  </label>
                </div>
              </div>

              <div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={newCareerData[formIndex]?.company_name || ""}
                    onChange={(e) =>
                      handleNewCareerInputChange(
                        formIndex,
                        "company_name",
                        e.target.value,
                      )
                    }
                    className="w-[250px] text-xl font-bold p-1"
                    placeholder="회사명"
                    maxLength={10}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteNewCareerForm(formIndex)}
                    className="text-[#AAAAAA] text-[30px] hover:text-red-500"
                  >
                    <HiOutlineXMark />
                  </button>
                </div>
                <div className="pt-[20px]">
                  <input
                    type="text"
                    value={newCareerData[formIndex]?.responsibility || ""}
                    onChange={(e) =>
                      handleNewCareerInputChange(
                        formIndex,
                        "responsibility",
                        e.target.value,
                      )
                    }
                    className="p-1"
                    placeholder="담장직무"
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

export default ProfileCareerForm
