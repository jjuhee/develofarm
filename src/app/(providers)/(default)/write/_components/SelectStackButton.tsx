import Checkbox from "@/components/ui/Checkbox"
import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

import type { Tables } from "@/types/supabase"
import { getPositions } from "../../profile/api"
import { useQuery } from "@tanstack/react-query"

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
  /* 기술 stack 드롭다운 열렸는지 닫혔는지 */
  const [isActive, setIsActive] = useState("")

  /* 포지션 종류 */
  const { data: positions } = useQuery({
    queryKey: ["positions"],
    queryFn: getPositions,
  })

  const onClickTechStackHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.innerText) {
      setIsActive(e.currentTarget.innerText)
    }
  }

  const onCheckTechsHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    position_id: string | undefined,
  ) => {
    if (!position_id) return
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

  /** 테크가 하나라도 포함 되어있으면 포지션이 체크 되었다고 판단하는 함수 */
  const isPositionChecked = (position_id: string | undefined) => {
    if (!categoryData.techs) return false

    return categoryData.techs.some((tech) => tech.position_id === position_id)
  }

  return (
    <>
      {positions?.map((position, index) => {
        return (
          <li
            key={position.id}
            className="relative"
            onMouseLeave={() => setIsActive("")}
          >
            <div
              className={`category justify-between mb-2 w-[100px] border-[1.5px] rounded-[8px] px-[10px] lg:px-[16px] lg:w-[140px] transition-all
          ${
            isActive === position.name &&
            "border-main-lime bg-main-lime hover:bg-main-lime hover:border-main-lime font-semibold "
          }
          ${
            isPositionChecked(position.id)
              ? "border-black text-black font-semibold"
              : "border-[#A6A6A6] text-[#2D2D2D] font-medium"
          }  `}
              onClick={onClickTechStackHandler}
            >
              {position.name}
              {isActive === position.name ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </div>

            <ul
              className={`absolute flex flex-col gap-[10px] bg-white border-[1.5px] border-black rounded-[8px] py-[10px] px-[4px] lg:px-[16px] w-[100px] lg:w-[140px] transition-all duration-300 z-10 ${
                isActive === position.name ? "visible" : "invisible"
              }`}
            >
              {allTechs?.[index]?.map((tech, i) => (
                <li key={i} className="">
                  <label
                    htmlFor={tech?.id}
                    className="flex items-center gap-1 cursor-pointer font-normal"
                  >
                    <Checkbox
                      id={tech?.id}
                      value={categoryData.techs?.some(
                        (item) =>
                          item.position_id === position.id &&
                          item.tech_id === tech.id,
                      )}
                      handler={(e) => onCheckTechsHandler(e, position.id)}
                    />
                    {tech?.tech_name}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        )
      })}
    </>
  )
}

export default SelectStackButton
