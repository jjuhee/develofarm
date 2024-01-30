"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { deleteCareers, getCareers } from "../../api"
import { Tables } from "@/types/supabase"
import { GoPlus } from "react-icons/go"
import { HiOutlineXMark } from "react-icons/hi2"

const ProfileCareerForm = ({
  userId,
  setUpdatedCareerData,
  newCareerData,
  setNewCareerData,
}: {
  userId: string
  setUpdatedCareerData: any
  newCareerData: any
  setNewCareerData: any
}) => {
  const [newCareerForms, setNewCareerForms] = useState([])
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
    field: string,
    value: string | boolean,
  ) => {
    const updatedCareers = [...careers]
    updatedCareers[index][field] = value
    setUpdatedCareerData(updatedCareers)
  }

  const handleNewCareerInputChange = (
    formIndex: number,
    field: string,
    value: string | boolean,
  ) => {
    setNewCareerData((prevData: any) => {
      const newData = [...prevData]
      newData[formIndex] = { ...newData[formIndex], [field]: value }
      return newData
    })
  }

  const handleAddNewCareerForm = () => {
    setNewCareerForms([...newCareerForms, {}])
    setNewCareerData([...newCareerData, {}])
  }

  const handleDeleteNewCareerForm = (formIndex: number) => {
    setNewCareerForms((prevForms) => {
      const updatedForms = [...prevForms]
      updatedForms.splice(formIndex, 1)
      return updatedForms
    })

    setNewCareerData((prevData: any) => {
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
      <div className="flex justify-between items-start w-[600px]">
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
                    />
                    <span> ~ </span>
                    <input
                      type="date"
                      value={career.period_to as string}
                      onChange={(e) =>
                        handleInputChange(index, "period_to", e.target.value)
                      }
                    />
                    <div className="pt-[30px]">
                      <label htmlFor={`employed_status_${index}`}>
                        <input
                          type="checkbox"
                          id={`employed_status_${index}`}
                          checked={career.employed_status}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "employed_status",
                              e.target.checked,
                            )
                          }
                          className="mr-[5px] accent-[#AAAAAA]"
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
                />
                <div className="pt-[35px]">
                  <label htmlFor={`employed_status_new_${formIndex}`}>
                    <input
                      type="checkbox"
                      id={`employed_status_new_${formIndex}`}
                      checked={
                        newCareerData[formIndex]?.employed_status || false
                      }
                      onChange={(e) =>
                        handleNewCareerInputChange(
                          formIndex,
                          "employed_status",
                          e.target.checked,
                        )
                      }
                      className="mr-[5px] accent-[#AAAAAA]"
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
