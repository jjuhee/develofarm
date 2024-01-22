"use client"

import React, { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  getAcademy,
  updateAcademies,
  addAcademy,
  deleteAcademies,
} from "../../api"
import { Tables } from "@/types/supabase"
import { HiOutlineXMark } from "react-icons/hi2"
import { GoPlus } from "react-icons/go"

const ProfileAcademyForm = ({ profileId }: { profileId: string }) => {
  const {
    data: academiesData,
    isLoading: academiesLoading,
    isError: academiesError,
    refetch: refetchAcademies,
  } = useQuery({
    queryKey: ["academies", profileId],
    queryFn: () => getAcademy({ userId: profileId }),
    enabled: !!profileId,
  })

  // 기존 academies 데이터의 상태 관리
  const [updatedAcademies, setUpdatedAcademies] = useState<
    Tables<"academies">[]
  >([])
  // 새로운 academies 데이터의 상태 관리
  const [newAcademiesData, setNewAcademiesData] = useState<Array<any>>([])

  useEffect(() => {
    if (academiesData && academiesData.length > 0) {
      setUpdatedAcademies([...academiesData])
    }
  }, [academiesData])

  // 기존 academies의 입력값이 변경될 때 호출되는 함수
  const handleInputChange = (
    academyIndex: number,
    field: string,
    value: any,
  ) => {
    const updatedAcademiesCopy = [...updatedAcademies]
    updatedAcademiesCopy[academyIndex] = {
      ...updatedAcademiesCopy[academyIndex],
      [field]: value,
    }
    setUpdatedAcademies(updatedAcademiesCopy)
  }

  // 새로운 academies의 입력값이 변경될 때 호출되는 함수
  const handleNewAcademyInputChange = (
    setIndex: number,
    field: string,
    value: any,
  ) => {
    const newAcademiesCopy = [...newAcademiesData]
    newAcademiesCopy[setIndex] = {
      ...newAcademiesCopy[setIndex],
      [field]: value,
    }
    setNewAcademiesData(newAcademiesCopy)
  }

  // 기존 academies을 업데이트하는 함수
  const handleUpdateAcademies = async () => {
    try {
      await updateAcademies(profileId, updatedAcademies)
      refetchAcademies()
    } catch (error) {
      console.error("Error updating academy data:", error)
    }
  }

  // 새로운 academies 세트를 추가하는 함수
  const handleAddAcademySet = () => {
    setNewAcademiesData([
      ...newAcademiesData,
      {
        period_from: "",
        period_to: "",
        academy_name: "",
        academy_major: "",
      },
    ])
  }

  // 새로운 academies 입력 세트를 제거하는 함수
  const handleRemoveAcademySet = (setIndex: number) => {
    const newAcademiesCopy = [...newAcademiesData]
    newAcademiesCopy.splice(setIndex, 1)
    setNewAcademiesData(newAcademiesCopy)
  }

  // 새로운 academies를 추가하는 함수
  const handleAddAcademy = async () => {
    try {
      await Promise.all(
        newAcademiesData.map(async (newAcademy) => {
          await addAcademy(profileId, newAcademy)
        }),
      )
      refetchAcademies()
      setNewAcademiesData([])
    } catch (error) {
      console.error("Error adding academy data:", error)
    }
  }

  // academies 데이터 로딩 중인 경우
  if (academiesLoading) {
    return <div>Loading...</div>
  }

  // academies 데이터 로딩 중 오류가 발생한 경우
  if (academiesError) {
    return <div>교육/활동 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  // 선택된 기존 academies 데이터를 삭제하는 함수
  const handleDeleteAcademy = async (academyId: string) => {
    try {
      await deleteAcademies(profileId, [academyId])
      refetchAcademies()
    } catch (error) {
      console.error("Error deleting academy data:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center w-[600px]">
        <h2 className="text-[26px] font-bold">교육/활동</h2>
        <button
          onClick={handleAddAcademySet}
          className="flex ml-auto border-2 border-[#297A5F] text-[#297A5F] text-[16px] font-[700] py-2 px-6 rounded-3xl hover:bg-[#297A5F] hover:text-white transition-all duration-300"
        >
          <GoPlus className="text-[25px] mx-[3px]" />
          추가하기
        </button>
      </div>

      {updatedAcademies.map((academy: Tables<"academies">, index: number) => (
        <div key={academy.id} className="relative">
          <div className="flex justify-between items-center pt-[30px]">
            <div>
              <div className="flex">
                <input
                  type="date"
                  value={academy.period_from as string}
                  onChange={(e) =>
                    handleInputChange(index, "period_from", e.target.value)
                  }
                />
                <span> ~ </span>
                <input
                  type="date"
                  value={academy.period_to as string}
                  onChange={(e) =>
                    handleInputChange(index, "period_to", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={academy.academy_name as string}
                    onChange={(e) =>
                      handleInputChange(index, "academy_name", e.target.value)
                    }
                    className="w-[250px] text-xl font-bold"
                    placeholder="활동명"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const confirmDelete =
                        window.confirm("이 내용을 삭제하시겠습니까?")
                      if (confirmDelete) {
                        handleDeleteAcademy(academy.id)
                      }
                    }}
                    className="text-[#AAAAAA] text-[30px] hover:text-red-500"
                  >
                    <HiOutlineXMark />
                  </button>
                </div>
              </div>
              <div className="pt-[10px]">
                <input
                  type="text"
                  value={academy.academy_major as string}
                  onChange={(e) =>
                    handleInputChange(index, "academy_major", e.target.value)
                  }
                  placeholder="활동내용"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* 새로운 경력 데이터 추가 */}
      <div>
        {newAcademiesData.map((newAcademy, setIndex) => (
          <div
            key={setIndex}
            className="flex justify-between items-center pt-[30px] relative"
          >
            <div>
              <div className="flex">
                <input
                  type="date"
                  value={newAcademy.period_from}
                  onChange={(e) =>
                    handleNewAcademyInputChange(
                      setIndex,
                      "period_from",
                      e.target.value,
                    )
                  }
                />
                <span> ~ </span>
                <input
                  type="date"
                  value={newAcademy.period_to}
                  onChange={(e) =>
                    handleNewAcademyInputChange(
                      setIndex,
                      "period_to",
                      e.target.value,
                    )
                  }
                />
              </div>
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                value={newAcademy.academy_name}
                onChange={(e) =>
                  handleNewAcademyInputChange(
                    setIndex,
                    "academy_name",
                    e.target.value,
                  )
                }
                className="w-[250px] text-xl font-bold"
                placeholder="활동명"
              />

              <button
                type="button"
                onClick={() => {
                  const confirmDelete =
                    window.confirm("이 내용을 삭제하시겠습니까?")
                  if (confirmDelete) {
                    handleRemoveAcademySet(setIndex)
                  }
                }}
                className="text-[#AAAAAA] text-[30px] hover:text-red-500"
              >
                <HiOutlineXMark />
              </button>
            </div>
          </div>
        ))}

        <hr className="my-8 border-t-2 border-gray-300" />
        <button
          type="button"
          onClick={async () => {
            await handleAddAcademy()
            handleUpdateAcademies()
          }}
          className="mt-[20px] bg-green-500 text-white px-[10px] py-[5px] rounded"
        >
          완료
        </button>
      </div>
    </div>
  )
}
export default ProfileAcademyForm
