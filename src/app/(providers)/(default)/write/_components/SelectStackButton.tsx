import { Tables } from "@/types/supabase"
import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
/* TEMP : 포지션id를 못넘겨줘서 임시 사용입니다 */
const POSITION_ID = {
  front: "be33a56c-a4da-43a3-984f-c6acd667b2ae",
  back: "0e68d5ef-ebc4-40d5-afe8-9bf557a52746",
  design: "e2be10af-aa25-4aa8-b18a-9e004d4f9bed",
}

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
    const target = e.target as HTMLElement
    if (target && target.innerText) {
      setIsActive(target.innerText)
    }
  }

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    position_id: string,
  ) => {
    const newTech = { tech_id: e.target.id, position_id }

    if (e.target.checked) {
      // 이미 선택된 경우 제외하고 업데이트
      const updatedTechs = categoryData.techs.filter(
        (tech) => tech.tech_id !== e.target.id,
      )
      setCategoryData({
        ...categoryData,
        techs: [...updatedTechs, newTech],
      })
    } else {
      // 체크 해제 됐을 경우 삭제
      const updatedTechs = categoryData.techs.filter(
        (tech) => tech.tech_id !== e.target.id,
      )
      setCategoryData({
        ...categoryData,
        techs: updatedTechs,
      })
    }
  }

  /** 테크가 하나라도 포함 되어있으면 포지션이 체크 되었다고 판단하는 함수
   * TODO: (issue) 프론트의 javascript 백엔드의 javascript 구분 못함
   */
  const isPositionChecked = (position_id: string) => {
    if (!categoryData.techs) return false

    return categoryData.techs.some((tech) => tech.position_id === position_id)
  }

  return (
    <>
      <li className="relative" onMouseLeave={() => setIsActive("")}>
        <div
          className={`flex items-center mb-2 justify-center gap-2 border-[1.5px]  px-[20px] py-[5px] rounded-full cursor-pointer transition-all
          ${
            isPositionChecked(POSITION_ID.front)
              ? "border-black bg-main-lime"
              : "border-slate-400"
          }  `}
          onClick={onClickTechStackHandler}
        >
          프론트엔드
          {isActive === "프론트엔드" ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>

        <ul
          className={`absolute flex flex-col bg-white border-[1.5px] border-black rounded-2xl py-[15px] px-[20px] transition-all z-10 ${
            isActive === "프론트엔드" ? "visible" : "invisible"
          }`}
        >
          {allTechs?.[0]?.map((tech, i) => (
            <li key={i}>
              <label
                htmlFor={tech?.id}
                className="cursor-pointer text-[16px] text-black"
              >
                <input
                  type="checkbox"
                  id={tech?.id}
                  // 포지션이 프론트이고, 테크가 있으면 체크
                  checked={categoryData.techs?.some(
                    (item) =>
                      item.position_id === POSITION_ID.front &&
                      item.tech_id === tech.id,
                  )}
                  className="mr-2"
                  onChange={(e) =>
                    onChangeHandler(e, "be33a56c-a4da-43a3-984f-c6acd667b2ae")
                  }
                />
                {tech?.tech_name}
              </label>
            </li>
          ))}
        </ul>
      </li>
      <li className="relative" onMouseLeave={() => setIsActive("")}>
        <div
          className={`flex items-center mb-2 justify-center gap-2 border-[1.5px] px-[20px] py-[5px] rounded-full cursor-pointer transition-all
          ${
            isPositionChecked(POSITION_ID.back)
              ? "border-black bg-main-lime"
              : "border-slate-400"
          }
          `}
          onClick={onClickTechStackHandler}
        >
          백엔드
          {isActive === "백엔드" ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <ul
          className={`absolute flex flex-col w-[150px] bg-white border-[1.5px] border-black rounded-2xl py-[15px] px-[20px] transition-all duration-300 z-10 ${
            isActive === "백엔드" ? "visible" : "invisible"
          }`}
        >
          {allTechs?.[1]?.map((tech, i) => (
            <li key={i}>
              <label
                htmlFor={tech?.id}
                className="cursor-pointer text-[16px] text-black"
              >
                <input
                  type="checkbox"
                  id={tech?.id}
                  // 포지션이 프론트이고, 테크가 있으면 체크
                  checked={categoryData.techs?.some(
                    (item) =>
                      item.position_id === POSITION_ID.back &&
                      item.tech_id === tech.id,
                  )}
                  className="mr-2"
                  onChange={(e) =>
                    onChangeHandler(e, "0e68d5ef-ebc4-40d5-afe8-9bf557a52746")
                  }
                />
                {tech?.tech_name}
              </label>
            </li>
          ))}
        </ul>
      </li>
      <li className="relative" onMouseLeave={() => setIsActive("")}>
        <div
          className={`flex items-center mb-2 justify-center gap-2 border-[1.5px] px-[20px] py-[5px] rounded-full cursor-pointer tranition-all
          ${
            isPositionChecked(POSITION_ID.design)
              ? "border-black bg-main-lime"
              : "border-slate-400"
          }
          `}
          onClick={onClickTechStackHandler}
        >
          디자인
          {isActive === "디자인" ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <ul
          className={`absolute flex flex-col w-[150px] bg-white border-[1.5px] border-black rounded-2xl py-[15px] px-[20px] transition-all z-10 ${
            isActive === "디자인" ? "visible" : "invisible"
          }`}
        >
          {allTechs?.[2]?.map((tech, i) => (
            <li key={i}>
              <label
                htmlFor={tech?.id}
                className="cursor-pointer text-[16px] text-black"
              >
                <input
                  type="checkbox"
                  name="디자인"
                  id={tech?.id}
                  checked={categoryData.techs?.some(
                    (item) =>
                      item.position_id === POSITION_ID.design &&
                      item.tech_id === tech.id,
                  )}
                  className="mr-2"
                  onChange={(e) =>
                    onChangeHandler(e, "e2be10af-aa25-4aa8-b18a-9e004d4f9bed")
                  }
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
