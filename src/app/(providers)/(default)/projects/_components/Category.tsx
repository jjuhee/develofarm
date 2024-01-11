"use client"

import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const Category = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <section className="flex flex-col gap-3 pb-[25px]">
      <h3 className="text-[26px] font-[700]">필터링 검색</h3>
      <div className="flex justify-around relative bg-gray-200 py-8">
        <div>
          <div className="flex flex-col gap-[16px] py-[15px]">
            <h5 className="text-[20px] font-[600]">프로젝트 방식</h5>
            <ul className="flex gap-[8px] items-center">
              <li className="border-[1.5px] border-slate-800 px-[20px] py-[10px] rounded-full ">
                오프라인
              </li>
              <li className="border-[1.5px] border-slate-400 px-[20px] py-[10px] rounded-full ">
                온라인
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-[16px] py-[15px]">
            <h5 className="text-[20px] font-[600]">활동 지역</h5>
            <select
              defaultValue="1"
              className="border-[1.5px] border-slate-400 px-[20px] py-[10px] rounded-full"
            >
              <option value="1">지역을 선택하세요</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-[16px] py-[15px]">
          <h5 className="text-[20px] font-[600]">프로젝트 기간</h5>
          <ul className="flex gap-[8px] items-center">
            <li className="border-[1.5px] border-slate-800 px-[20px] py-[10px] rounded-full ">
              시작일
            </li>
            <li className="border-[1.5px] border-slate-400 px-[20px] py-[10px] rounded-full ">
              종료일
            </li>
          </ul>

          <input type="date" />
        </div>
        <div className="flex flex-col gap-[16px] py-[15px]">
          <h5 className="text-[20px] font-[600]">기술 스택</h5>
          <ul className="flex gap-3 items-center">
            <li className="relative" onMouseLeave={() => setIsActive(false)}>
              <div
                className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[10px] rounded-full cursor-pointer"
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
                  <input type="checkbox" className="mr-2" />
                  <span>Vue</span>
                </li>
              </ul>
            </li>
            <div className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[10px] rounded-full">
              백엔드 <IoIosArrowDown />
            </div>
            <div className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[10px] rounded-full">
              디자인 <IoIosArrowDown />
            </div>
          </ul>
        </div>
        <button className="absolute bottom-5 right-5 bg-black text-white text-[16px] py-[12px] px-[34px] rounded-full">
          검색
        </button>
      </div>
    </section>
  )
}

export default Category
