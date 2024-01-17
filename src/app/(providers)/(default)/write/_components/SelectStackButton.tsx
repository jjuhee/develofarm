import { Tables } from "@/types/supabase"
import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

interface Props {
  allTechs: Tables<"techs">[][]
  categoryData: TCategoryData
  setCategoryData: React.Dispatch<React.SetStateAction<TCategoryData>>
}

const SelectStackButton = ({
  allTechs,
  categoryData,
  setCategoryData,
}: Props) => {
  const [isActive, setIsActive] =
    useState("") /* 기술 stack 드롭다운 열렸는지 닫혔는지 */

  const onClickTechStackHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsActive(e.target.innerText)
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTech = { id: e.target.id }

    if (e.target.checked) {
      // 이미 선택된 경우 제외하고 업데이트
      const updatedTechs = categoryData.techs.filter(
        (tech) => tech.id !== e.target.id,
      )
      setCategoryData({
        ...categoryData,
        techs: [...updatedTechs, newTech],
      })
    } else {
      // 체크 해제 됐을 경우 삭제
      const updatedTechs = categoryData.techs.filter(
        (tech) => tech.id !== e.target.id,
      )
      setCategoryData({
        ...categoryData,
        techs: updatedTechs,
      })
    }
  }

  return (
    <>
      <li className="relative" onMouseLeave={() => setIsActive("")}>
        <div
          className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full cursor-pointer"
          onClick={onClickTechStackHandler}
        >
          프론트엔드
          {isActive === "프론트엔드" ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>

        <ul
          className={`absolute flex flex-col bg-slate-50 w-[150px] rounded-lg py-[15px] px-[20px] transition-all ${
            isActive === "프론트엔드" ? "visible" : "invisible"
          }`}
        >
          {allTechs?.[0]?.map((tech, i) => (
            <li key={i}>
              <label htmlFor={tech?.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  id={tech?.id}
                  className="mr-2"
                  onChange={onChangeHandler}
                />
                {tech?.tech_name}
              </label>
            </li>
          ))}
        </ul>
      </li>
      <li className="relative" onMouseLeave={() => setIsActive("")}>
        <div
          className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full cursor-pointer"
          onClick={onClickTechStackHandler}
        >
          백엔드
          {isActive === "백엔드" ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <ul
          className={`absolute flex flex-col bg-slate-50 w-[150px] rounded-lg py-[15px] px-[20px] transition-all ${
            isActive === "백엔드" ? "visible" : "invisible"
          }`}
        >
          {allTechs?.[1]?.map((tech, i) => (
            <li key={i}>
              <label htmlFor={tech?.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  id={tech?.id}
                  className="mr-2"
                  onChange={onChangeHandler}
                />
                {tech?.tech_name}
              </label>
            </li>
          ))}
        </ul>
      </li>
      <li className="relative" onMouseLeave={() => setIsActive("")}>
        <div
          className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full cursor-pointer"
          onClick={onClickTechStackHandler}
        >
          디자인
          {isActive === "디자인" ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <ul
          className={`absolute flex flex-col bg-slate-50 w-[150px] rounded-lg py-[15px] px-[20px] transition-all ${
            isActive === "디자인" ? "visible" : "invisible"
          }`}
        >
          {allTechs?.[3]?.map((tech, i) => (
            <li key={i}>
              <label htmlFor={tech?.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  id={tech?.id}
                  className="mr-2"
                  onChange={onChangeHandler}
                />
                {tech?.tech_name}
              </label>
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}

export default SelectStackButton
