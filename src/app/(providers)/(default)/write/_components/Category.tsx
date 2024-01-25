"use client"

import { useQuery } from "@tanstack/react-query"
import React, { Dispatch, useState } from "react"
import { getRegions, getTechsByPositions } from "../../projects/api"
import SelectStackButton from "./SelectStackButton"
import { Tables } from "@/types/supabase"
import Button from "@/components/ui/Button"
import { useCustomModal } from "@/hooks/useCustomModal"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

interface Props {
  categoryData: TCategoryData
  setCategoryData: React.Dispatch<React.SetStateAction<TCategoryData>>
  isWritePage: boolean
  setOption?: Dispatch<React.SetStateAction<TProjectsOptions>>
}

const Category = ({
  categoryData,
  setCategoryData,
  isWritePage,
  setOption,
}: Props) => {
  const { openCustomModalHandler } = useCustomModal()

  const {
    startDate,
    endDate,
    isOffline,
    region,
    numberOfMembers,
    techs,
    positions,
  } = categoryData

  const [isRegionActive, setIsRegionActive] = useState(false)

  /** 모든 position에 연결된 tech를 position_tech table에서 불러온다 */
  const { data: allTechs } = useQuery({
    queryKey: ["techsByPositions"],
    queryFn: getTechsByPositions,
  })

  /** project_region table */
  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  })

  /** 프로젝트 필터링 검색 핸들러 */
  const onClickSearchHandler = () => {
    setOption &&
      setOption({
        isOffline: isOffline,
        startDate: startDate,
        endDate: endDate,
        regionId: region,
        techs: techs,
      })
    openCustomModalHandler("검색되었습니다.", "alert")
  }

  const onClickResetFilteringHandler = () => {
    //TODO: 카테고리 데이터 리셋
    setCategoryData({
      startDate: "",
      endDate: "",
      isOffline: null,
      region: "",
      numberOfMembers: 0,
      positions: [],
      techs: [],
    })
    setOption &&
      setOption({
        isOffline: null,
        startDate: "",
        endDate: "",
        regionId: "",
        techs: [],
      })
  }

  return (
    <section className="flex flex-col gap-3">
      {!isWritePage && <h3 className="text-[26px] font-[700]">필터링 검색</h3>}
      <div className="flex relative justify-between gap-[60px] border-y-[1.5px] py-5 px-1 border-slate-800">
        <div>
          <div className="flex flex-col gap-[16px] py-[15px]">
            <h5 className="text-[20px] font-[600]">프로젝트 방식</h5>
            <ul className="flex gap-[8px] items-center *:w-[90px] *:text-center">
              <li
                onClick={() =>
                  setCategoryData({ ...categoryData, isOffline: true })
                }
                className={`category ${
                  !!isOffline
                    ? "bg-[#D2D2D2] border-[#D2D2D2] text-black font-semibold"
                    : "border-[#A6A6A6] text-[#2D2D2D] font-medium"
                }`}
              >
                오프라인
              </li>
              <li
                onClick={() =>
                  setCategoryData({ ...categoryData, isOffline: false })
                }
                className={` category ${
                  isOffline === false
                    ? "bg-[#D2D2D2] border-[#D2D2D2] text-black font-semibold"
                    : "border-[#A6A6A6] text-[#2D2D2D] font-medium"
                }`}
              >
                온라인
              </li>
            </ul>
          </div>
          {isOffline && (
            <div className="flex flex-col gap-[16px] py-[15px]">
              <h5 className="text-[20px] font-[600]">활동 지역</h5>
              <div className="relative">
                <div
                  className={`category flex items-center justify-between px-[20px] py-[5px] rounded-lg w-[180px] h-[40px] ${
                    isRegionActive
                      ? "border-main-lime bg-main-lime hover:bg-main-lime hover:border-main-lime font-semibold"
                      : "bg-[#D2D2D2] border-[#D2D2D2] text-black font-semibold"
                  }`}
                  onClick={() => setIsRegionActive(!isRegionActive)}
                >
                  {regions?.find((region) => region.id == categoryData.region)
                    ?.region || "지역을 입력하세요"}
                  {isRegionActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                <ul
                  className={`absolute flex flex-col mt-[3px] rounded-lg border-[1px] border-black  ${
                    isRegionActive ? "visible" : "invisible"
                  }`}
                >
                  {regions?.map((region) => (
                    <li
                      key={region.id}
                      className="cursor-pointer px-[18px] bg-white text-[14px] leading-[38px] w-[180px] h-[38px] first:rounded-t-lg last:rounded-b-lg z-10 hover:bg-[#DBFFB2]"
                      onClick={(e) => {
                        setCategoryData({
                          ...categoryData,
                          region: region.id,
                        })
                        setIsRegionActive(false)
                      }}
                    >
                      {region.region}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {isWritePage && (
          <div className="flex flex-col gap-[16px] py-[15px] w-[99px]">
            <h5 className="text-[20px] font-[600]">구인 인원</h5>
            <div className="flex gap-[8px] items-center">
              <input
                className={`category w-[70px] text-center
                ${
                  numberOfMembers
                    ? "border-black text-black font-semibold"
                    : "border-[#A6A6A6] text-[#2D2D2D] font-medium"
                }`}
                type="number"
                value={numberOfMembers}
                min={0}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    numberOfMembers: Number(e.target.value),
                  })
                }
              />
              <span>명</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-[16px] py-[15px]">
          <h5 className="text-[20px] font-[600]">프로젝트 기간</h5>
          <ul className="flex flex-col gap-4 items-center">
            <li className="flex items-center gap-4">
              <label className="w-[50px] text-[16px]">시작일</label>
              {/* TODO 3 : 유효성검사 - 날짜 오늘날짜 이후,종료일은 시작날짜 이후로만 선택되게하기  */}
              <input
                className={`category w-[184px] px-[20px] py-[5px]
                ${
                  startDate
                    ? "border-black text-black font-semibold"
                    : "border-[#A6A6A6] text-[#2D2D2D] font-medium"
                }
                `}
                type="date"
                name="project_start_date"
                value={startDate}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    startDate: e.target.value,
                  })
                }
              />
            </li>
            <li className="flex items-center gap-4">
              <label className="w-[50px] text-[16px]">종료일</label>
              <input
                className={`category w-[184px] px-[20px] py-[5px]
                ${
                  endDate
                    ? "border-black text-black font-semibold"
                    : "border-[#A6A6A6] text-[#2D2D2D] font-medium"
                }`}
                type="date"
                name="project_end_date"
                value={endDate}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    endDate: e.target.value,
                  })
                }
              />
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-[16px] py-[15px]">
          <h5 className="text-[20px] font-[600]">기술 스택</h5>
          <ul className="flex gap-3 items-center">
            <SelectStackButton
              allTechs={allTechs as Tables<"techs">[][]}
              categoryData={categoryData}
              setCategoryData={setCategoryData}
            />
          </ul>
        </div>
        {/* 메인page */}
        {!isWritePage && (
          <div className="absolute bottom-6 right-[1px] flex gap-3 align-items *:px-[16px] *:py-[0px] *:w-[100px] *:h-[40px]">
            <Button
              type="border"
              text="초기화"
              handler={onClickResetFilteringHandler}
            />

            <Button text="검색" handler={onClickSearchHandler} />
          </div>
        )}
      </div>
    </section>
  )
}

export default Category
