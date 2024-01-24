"use client"

import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import React, { useState } from "react"
import type { Tables } from "@/types/supabase"

interface Props {
  positions: Tables<"positions">[]
}

const MemberCategory = ({ positions }: Props) => {
  const { selectCategory } = useCategoryStore((state) => state)
  const { setMemberPosition } = useMembersStore((state) => state)
  const [isActive, setIsActive] = useState("전체보기")

  const onClickAllViewHandler = (title: string) => {
    setIsActive(title)
    selectCategory(title)
    setMemberPosition(null)
  }

  const onClickCategoryHandler = (position: Tables<"positions">) => {
    setIsActive(position.name)
    selectCategory(position.name)
    setMemberPosition(position)

    window.scroll({
      top: 0,
    })
  }

  return (
    <ul className="flex py-[20px] gap-[20px] text-[17px] text-[#777E90] font-[700]">
      <li
        onClick={() => onClickAllViewHandler("전체보기")}
        className={`cursor-pointer py-2 px-4 ${
          isActive === "전체보기"
            ? "font-bold text-black bg-main-lime"
            : "font-[400] border-[1.5px] border-[#EAEAEA] text-[#666666]"
        }`}
      >
        전체보기
      </li>
      {positions?.map((position) => (
        <li
          key={position.id}
          onClick={() => onClickCategoryHandler(position)}
          className={`cursor-pointer py-2 px-4 ${
            isActive === position.name
              ? "font-bold text-black bg-main-lime"
              : "font-[400] border-[1.5px] border-[#EAEAEA] text-[#666666]"
          }`}
        >
          {position.name}
        </li>
      ))}
    </ul>
  )
}

export default MemberCategory
