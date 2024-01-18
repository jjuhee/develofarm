"use client"

import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import { Tables } from "@/types/supabase"
import React, { useState } from "react"
import { useStore } from "zustand"

interface Props {
  positions: Tables<"positions">[]
}

const MemberCategory = ({ positions }: Props) => {
  const category = [
    {
      id: 0,
      title: "전체보기",
    },
    {
      id: 1,
      title: "프론트엔드",
    },
    {
      id: 2,
      title: "백엔드",
    },
    {
      id: 3,
      title: "디자인",
    },
    {
      id: 4,
      title: "기획",
    },
  ]

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
  }

  return (
    <ul className="flex flex-col fixed top-40 left-30 px-[32px] py-[48px] w-[220px] h-[328px] gap-[20px] rounded-2xl text-[17px] text-[#777E90] font-[700] shadow-2xl">
      {/* TODO: isActive 시 bold 지정하기*/}
      <li
        onClick={() => onClickAllViewHandler("전체보기")}
        className={`cursor-pointer ${
          isActive === "전체보기" ? "font-bold text-black" : "font-[400]"
        }`}
      >
        전체보기
      </li>
      {positions?.map((position) => (
        <li
          key={position.id}
          onClick={() => onClickCategoryHandler(position)}
          className={`cursor-pointer ${
            isActive === position.name ? "font-bold text-black" : "font-[400]"
          }`}
        >
          {position.name}
        </li>
      ))}
    </ul>
  )
}

export default MemberCategory
