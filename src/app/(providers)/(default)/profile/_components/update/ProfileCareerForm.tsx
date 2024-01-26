"use client"

import React, { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getCareers, updateCareers, addCareer, deleteCareers } from "../../api"
import { Tables } from "@/types/supabase"
import { HiOutlineXMark } from "react-icons/hi2"
import { GoPlus } from "react-icons/go"
import useCustomModalStore from "@/store/customModal"

const ProfileCareerForm = ({ profileId }: { profileId: string }) => {
  const {
    data: careers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["careers", profileId],
    queryFn: () => getCareers({ userId: profileId }),
    enabled: !!profileId,
  })

  // 기존 경력 데이터의 상태 관리
  const [updatedCareers, setUpdatedCareers] = useState<Tables<"careers">[]>([])
  // 새로운 경력 데이터의 상태 관리
  const [newCareersData, setNewCareersData] = useState<Array<any>>([])

  useEffect(() => {
    if (careers && careers.length > 0) {
      setUpdatedCareers([...careers])
    }
  }, [careers])

  // 기존 경력의 입력값이 변경될 때 호출되는 함수
  const handleInputChange = (jobIndex: number, field: string, value: any) => {
    const updatedJobs = [...updatedCareers]
    updatedJobs[jobIndex] = {
      ...updatedJobs[jobIndex],
      [field]: value,
    }
    setUpdatedCareers(updatedJobs)
  }

  // 새로운 경력의 입력값이 변경될 때 호출되는 함수
  const handleNewCareerInputChange = (
    setIndex: number,
    field: string,
    value: any,
  ) => {
    const newCareers = [...newCareersData]
    newCareers[setIndex] = {
      ...newCareers[setIndex],
      [field]: value,
    }
    setNewCareersData(newCareers)
  }

  // 기존 경력을 업데이트하는 함수
  const handleUpdateCareers = async () => {
    try {
      await updateCareers(profileId, updatedCareers)
      refetch()
    } catch (error) {
      console.error("Error updating career data:", error)
    }
  }

  // 새로운 경력 세트를 추가하는 함수
  const handleAddCareerSet = () => {
    setNewCareersData([
      ...newCareersData,
      {
        period_from: "",
        period_to: "",
        employed_status: false,
        company_name: "",
        responsibility: "",
      },
    ])
  }

  // 새로운 경력 입력 세트를 제거하는 함수
  const handleRemoveCareerSet = (setIndex: number) => {
    const newCareers = [...newCareersData]
    newCareers.splice(setIndex, 1)
    setNewCareersData(newCareers)
  }

  // 새로운 경력을 추가하는 함수
  const handleAddCareer = async () => {
    try {
      await Promise.all(
        newCareersData.map(async (newCareer) => {
          await addCareer(profileId, newCareer)
        }),
      )
      refetch()
      setNewCareersData([])
    } catch (error) {
      console.error("Error adding career data:", error)
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>경력 데이터를 불러오는 중 오류가 발생했습니다</div>
  }

  // 선택된 기존 경력 데이터를 삭제하는 함수
  const handleDeleteCareer = async (careerId: string) => {
    try {
      await deleteCareers(profileId, [careerId])
      refetch()
    } catch (error) {
      console.error("Error deleting career data:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-start w-[600px]">
        <h2 className="text-[26px] font-bold">경력</h2>
        <button
          onClick={handleAddCareerSet}
          className="flex ml-auto border-[1.5px] border-[#A6A6A6] bg-[#ffffff] text-[16px] font-[700] py-2 px-6 rounded-3xl hover:bg-[#EEEEEE] hover:border-[#000000] transition-all duration-300"
        >
          <GoPlus className="text-[25px] mx-[3px]" />
          추가하기
        </button>
      </div>

      {updatedCareers.map((job: Tables<"careers">, index: number) => (
        <div key={job.id} className="relative">
          <div className="flex justify-between items-center pt-[30px]">
            <div>
              <div className="flex">
                <input
                  type="date"
                  value={job.period_from as string}
                  onChange={(e) =>
                    handleInputChange(index, "period_from", e.target.value)
                  }
                />
                <span> ~ </span>
                <input
                  type="date"
                  value={job.period_to as string}
                  onChange={(e) =>
                    handleInputChange(index, "period_to", e.target.value)
                  }
                />
              </div>
              <div className="pt-[10px]">
                <input
                  type="checkbox"
                  checked={job.employed_status}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "employed_status",
                      e.target.checked,
                    )
                  }
                  className="mr-[5px] accent-[#AAAAAA]"
                />
                <label>재직중</label>
              </div>
            </div>

            <div className="relative">
              <div className="flex">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={job.company_name as string}
                    onChange={(e) =>
                      handleInputChange(index, "company_name", e.target.value)
                    }
                    className="w-[250px] text-xl font-bold p-1"
                    placeholder="회사명"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      showDeleteConfirmationModal(() =>
                        handleDeleteCareer(job.id),
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
                  value={job.responsibility as string}
                  onChange={(e) =>
                    handleInputChange(index, "responsibility", e.target.value)
                  }
                  className="p-1"
                  placeholder="담장직무"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* 새로운 경력 데이터 추가 */}
      <div>
        {newCareersData.map((newCareer, setIndex) => (
          <div
            key={setIndex}
            className="flex justify-between items-center pt-[30px] relative"
          >
            <div>
              <div className="flex">
                <input
                  type="date"
                  value={newCareer.period_from}
                  onChange={(e) =>
                    handleNewCareerInputChange(
                      setIndex,
                      "period_from",
                      e.target.value,
                    )
                  }
                />
                <span> ~ </span>
                <input
                  type="date"
                  value={newCareer.period_to}
                  onChange={(e) =>
                    handleNewCareerInputChange(
                      setIndex,
                      "period_to",
                      e.target.value,
                    )
                  }
                />
              </div>
              <div className="pt-[10px]">
                <input
                  type="checkbox"
                  checked={newCareer.employed_status}
                  onChange={(e) =>
                    handleNewCareerInputChange(
                      setIndex,
                      "employed_status",
                      e.target.checked,
                    )
                  }
                  className="mr-[5px]"
                />
                <label>재직중</label>
              </div>
            </div>

            <div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={newCareer.company_name}
                  onChange={(e) =>
                    handleNewCareerInputChange(
                      setIndex,
                      "company_name",
                      e.target.value,
                    )
                  }
                  className="w-[250px] text-xl font-bold p-1"
                  placeholder="회사명"
                />

                <button
                  type="button"
                  onClick={() =>
                    showDeleteConfirmationModal(() =>
                      handleRemoveCareerSet(setIndex),
                    )
                  }
                  className="text-[#AAAAAA] text-[30px] hover:text-red-500"
                >
                  <HiOutlineXMark />
                </button>
              </div>
              <div className="pt-[10px]">
                <input
                  type="text"
                  value={newCareer.responsibility}
                  onChange={(e) =>
                    handleNewCareerInputChange(
                      setIndex,
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
        ))}

        <hr className="my-8 border-t-2 border-gray-300" />
        <button
          type="button"
          onClick={() => {
            handleAddCareer()
            handleUpdateCareers()
          }}
          className="text-[15px] ml-[510px] mb-[30px] px-4 py-2 rounded-[6px] bg-[#B8FF65]"
        >
          저장하기
        </button>
      </div>
    </div>
  )
}

export default ProfileCareerForm
