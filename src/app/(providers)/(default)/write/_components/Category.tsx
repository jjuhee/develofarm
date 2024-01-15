"use client"

// import Button from "@/components/ui/Button"
import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

interface Props {
  isWritePage: boolean
}

const Category = ({ isWritePage }: Props) => {
  const [isActive, setIsActive] = useState(false)
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [region, setRegion] = useState<string>("")
  const [numberOfMembers, setNumberOfMembers] = useState<number>(0)

  return (
    <section className="flex flex-col gap-3 pb-[25px]">
      {!isWritePage && <h3 className="text-[26px] font-[700]">필터링 검색</h3>}
      <div
        className={
          "flex justify-around relativepy-8 border-y-[1.5px] border-slate-800"
        }
      >
        <div>
          <div className="flex flex-col gap-[16px] py-[15px]">
            <h5 className="text-[20px] font-[600]">프로젝트 방식</h5>
            <ul className="flex gap-[8px] items-center">
              <li className="category border-slate-800">오프라인</li>
              <li className="category border-slate-400">온라인</li>
            </ul>
          </div>
          <div className="flex flex-col gap-[16px] py-[15px]">
            <h5 className="text-[20px] font-[600]">활동 지역</h5>
            <select
              defaultValue="1"
              className="border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full"
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="1">지역을 선택하세요</option>
              <option value="2">서울/경기/인천</option>
              <option value="3">강원도</option>
              <option value="4">경상도</option>
              <option value="5">전라도</option>
              <option value="6">충청도</option>
              <option value="7">제주도</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] py-[15px]">
          <h5 className="text-[20px] font-[600]">프로젝트 기간</h5>
          <ul className="flex flex-col gap-[8px] items-center">
            <li className="flex items-center gap-[5px]">
              <label>시작일:</label>
              <input
                className="border-[1.5px] border-slate-800 px-[20px] py-[5px] rounded-full "
                type="date"
                name="project_start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </li>
            <li className="flex items-center gap-[5px]">
              <label>종료일:</label>
              <input
                className="border-[1.5px] border-slate-800 px-[20px] py-[5px] rounded-full "
                type="date"
                name="project_end_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </li>
          </ul>
        </div>
        {/* TODO: (jhee) 포지션/스택 컴포넌트로 분리... */}
        <div className="flex flex-col gap-[16px] py-[15px]">
          <h5 className="text-[20px] font-[600]">기술 스택</h5>
          <ul className="flex gap-3 items-center">
            <li className="relative" onMouseLeave={() => setIsActive(false)}>
              <div
                className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full cursor-pointer"
                onClick={() => setIsActive(!isActive)}
              >
                프론트엔드 {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
              <ul
                className={`absolute flex flex-col bg-slate-50 w-[150px] rounded-lg py-[15px] px-[20px] transition-all ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <li>
                  <label className="cursor-pointer">
                    <input type="checkbox" id="react" className="mr-2" />
                    React
                  </label>
                </li>
                <li>
                  <label className="cursor-pointer">
                    <input type="checkbox" id="react" className="mr-2" />
                    Vue
                  </label>
                </li>
                <li>
                  <label className="cursor-pointer">
                    <input type="checkbox" id="react" className="mr-2" />
                    NextJS
                  </label>
                </li>
              </ul>
            </li>
            <div className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full">
              백엔드 <IoIosArrowDown />
            </div>
            <div className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full">
              디자인 <IoIosArrowDown />
            </div>
          </ul>
        </div>
        {/* 글쓰기page vs 메인page */}
        {isWritePage ? (
          <div className="flex flex-col gap-[16px] py-[15px]">
            <h5 className="text-[20px] font-[600]">인원 수</h5>
            <div className="gap-[8px]">
              <input
                className="w-[70px] rounded-md"
                type="number"
                value={numberOfMembers}
                min={0}
                onChange={(e) => setNumberOfMembers(Number(e.target.value))}
              />
              <span>명</span>
            </div>
          </div>
        ) : (
          //<Button text="검색" />
          <button className="mt-auto bg-black text-white text-[16px] py-[12px] px-[34px] rounded-full">
            검색
          </button>
        )}
      </div>
    </section>
  )
}

export default Category
