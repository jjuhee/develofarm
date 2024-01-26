"use client"

import React, { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getSpecs, updateSpecs, addSpec, deleteSpecs } from "../../api"
import { Tables } from "@/types/supabase"
import { HiOutlineXMark } from "react-icons/hi2"
import { GoPlus } from "react-icons/go"
import useCustomModalStore from "@/store/customModal"

const ProfileSpecForm = ({ profileId }: { profileId: string }) => {
  const {
    data: specs,
    isLoading: specsLoading,
    isError: specsError,
    refetch: refetchSpecs,
  } = useQuery({
    queryKey: ["specs", profileId],
    queryFn: () => getSpecs({ userId: profileId }),
    enabled: !!profileId,
  })

  // 기존 specs 데이터의 상태 관리
  const [updatedSpecs, setUpdatedSpecs] = useState<Tables<"specs">[]>([])
  // 새로운 specs 데이터의 상태 관리
  const [newSpecsData, setNewSpecsData] = useState<Array<any>>([])

  useEffect(() => {
    if (specs && specs.length > 0) {
      setUpdatedSpecs([...specs])
    }
  }, [specs])

  // 기존 specs의 입력값이 변경될 때 호출되는 함수
  const handleInputChange = (specIndex: number, field: string, value: any) => {
    const updatedSpecsCopy = [...updatedSpecs]
    updatedSpecsCopy[specIndex] = {
      ...updatedSpecsCopy[specIndex],
      [field]: value,
    }
    setUpdatedSpecs(updatedSpecsCopy)
  }

  // 새로운 specs의 입력값이 변경될 때 호출되는 함수
  const handleNewSpecInputChange = (
    setIndex: number,
    field: string,
    value: any,
  ) => {
    const newSpecsCopy = [...newSpecsData]
    newSpecsCopy[setIndex] = {
      ...newSpecsCopy[setIndex],
      [field]: value,
    }
    setNewSpecsData(newSpecsCopy)
  }

  // 기존 specs을 업데이트하는 함수
  const handleUpdateSpecs = async () => {
    try {
      await updateSpecs(profileId, updatedSpecs)
      refetchSpecs()
    } catch (error) {
      console.error("Error updating specs data:", error)
    }
  }

  // 새로운 specs 세트를 추가하는 함수
  const handleAddSpecSet = () => {
    setNewSpecsData([
      ...newSpecsData,
      {
        spec_date: "",
        spec_name: "",
      },
    ])
  }

  // 새로운 specs 입력 세트를 제거하는 함수
  const handleRemoveSpecSet = (setIndex: number) => {
    const newSpecsCopy = [...newSpecsData]
    newSpecsCopy.splice(setIndex, 1)
    setNewSpecsData(newSpecsCopy)
  }

  // 새로운 specs을 추가하는 함수
  const handleAddSpec = async () => {
    try {
      await Promise.all(
        newSpecsData.map(async (newSpec) => {
          await addSpec(profileId, newSpec)
        }),
      )
      refetchSpecs()
      setNewSpecsData([])
    } catch (error) {
      console.error("Error adding specs data:", error)
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

  // specs 데이터 로딩 중인 경우
  if (specsLoading) {
    return <div>Loading...</div>
  }

  // specs 데이터 로딩 중 오류가 발생한 경우
  if (specsError) {
    return <div>자격/어학/수상 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  // 선택된 기존 specs 데이터를 삭제하는 함수
  const handleDeleteSpec = async (specId: string) => {
    try {
      await deleteSpecs(profileId, [specId])
      refetchSpecs()
    } catch (error) {
      console.error("Error deleting specs data:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-start w-[600px]">
        <h2 className="text-[26px] font-bold">자격/어학/수상</h2>
        <button
          onClick={handleAddSpecSet}
          className="flex ml-auto border-[1.5px] border-[#A6A6A6] bg-[#ffffff] text-[16px] font-[700] py-2 px-6 rounded-3xl hover:bg-[#EEEEEE] hover:border-[#000000] transition-all duration-300"
        >
          <GoPlus className="text-[25px] mx-[3px]" />
          추가하기
        </button>
      </div>

      {updatedSpecs.map((spec: Tables<"specs">, index: number) => (
        <div key={spec.id} className="relative">
          <div className="flex justify-between items-start pt-[30px]">
            <input
              type="date"
              value={spec.spec_date as string}
              onChange={(e) =>
                handleInputChange(index, "spec_date", e.target.value)
              }
            />
            <div className="relative flex items-start">
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
                onClick={() =>
                  showDeleteConfirmationModal(() => handleDeleteSpec(spec.id))
                }
                className="text-[#AAAAAA] text-[30px] hover:text-red-500"
              >
                <HiOutlineXMark />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* 새로운 경력 데이터 추가 */}
      <div>
        {newSpecsData.map((newSpec, setIndex) => (
          <div
            key={setIndex}
            className="flex justify-between items-start pt-[30px] pb-[43px]"
          >
            <input
              type="date"
              value={newSpec.spec_date}
              onChange={(e) =>
                handleNewSpecInputChange(setIndex, "spec_date", e.target.value)
              }
            />
            <div className="relative flex items-center">
              <input
                type="text"
                value={newSpec.spec_name}
                onChange={(e) =>
                  handleNewSpecInputChange(
                    setIndex,
                    "spec_name",
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
                    handleRemoveSpecSet(setIndex),
                  )
                }
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
            await handleAddSpec()
            handleUpdateSpecs()
          }}
          className="text-[15px] ml-[510px] mb-[30px] px-4 py-2 rounded-[6px] bg-[#B8FF65]"
        >
          저장하기
        </button>
      </div>
    </div>
  )
}

export default ProfileSpecForm
