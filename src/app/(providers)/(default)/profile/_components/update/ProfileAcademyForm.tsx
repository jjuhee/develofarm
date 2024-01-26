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
import useCustomModalStore from "@/store/customModal"

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

  const modalStore = useCustomModalStore()
  // 삭제 확인용 모달을 보여주는 함수
  const showDeleteConfirmationModal = (handler: () => void) => {
    modalStore.setViewCustomModal(true)
    modalStore.setModalType("confirm")
    modalStore.setModalMessage("이 내용을 삭제하시겠습니까?")
    modalStore.setHandler(handler)
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
      <div className="flex justify-between items-start w-[600px]">
        <h2 className="text-[26px] font-bold">교육/활동</h2>
        <button
          onClick={handleAddAcademySet}
          className="flex ml-auto border-[1.5px] border-[#A6A6A6] bg-[#ffffff] text-[16px] font-[700] py-2 px-6 rounded-3xl hover:bg-[#EEEEEE] hover:border-[#000000] transition-all duration-300"
        >
          <GoPlus className="text-[25px] mx-[3px]" />
          추가하기
        </button>
      </div>

      {updatedAcademies.map((academy: Tables<"academies">, index: number) => (
        <div key={academy.id} className="relative">
          <div className="flex justify-between items-start pt-[30px]">
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
                    className="w-[250px] text-xl font-bold p-1"
                    placeholder="활동명"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      showDeleteConfirmationModal(() =>
                        handleDeleteAcademy(academy.id),
                      )
                    }
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
                  className="p-1"
                  placeholder="활동내용"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* 새로운 교육/활동 데이터 추가 */}
      <div>
        {newAcademiesData.map((newAcademy, setIndex) => (
          <div
            key={setIndex}
            className="flex justify-between items-start pt-[24px] relative"
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

            <div className="relative items-start">
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
                className="w-[250px] text-xl font-bold p-1"
                placeholder="활동명"
              />
              <button
                type="button"
                onClick={() =>
                  showDeleteConfirmationModal(() =>
                    handleRemoveAcademySet(setIndex),
                  )
                }
                className="text-[#AAAAAA] text-[30px] hover:text-red-500"
              >
                <HiOutlineXMark />
              </button>

              <div className="pt-[10px]">
                <input
                  type="text"
                  value={newAcademy.academy_major as string}
                  onChange={(e) =>
                    handleNewAcademyInputChange(
                      setIndex,
                      "academy_major",
                      e.target.value,
                    )
                  }
                  className="p-1"
                  placeholder="활동내용"
                />
              </div>
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
          className="text-[15px] ml-[480px] mb-[20px] px-4 py-2 rounded-[6px] bg-[#B8FF65] hover:bg-[#666666] hover:text-[#B8FF65]"
        >
          내용 저장하기
        </button>
      </div>
    </div>
  )
}
export default ProfileAcademyForm
