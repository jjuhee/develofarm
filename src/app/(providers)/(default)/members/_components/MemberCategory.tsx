"use client"

import useCategoryStore from "@/store/store"
import React, { useState } from "react"
import { useStore } from "zustand"

const MemberCategory = () => {
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

  const [isActive, setIsActive] = useState("전체보기")

  const onClickCategoryHandler = (title: string) => {
    setIsActive(title)
    selectCategory(title)
  }

  return (
    <ul className="flex flex-col px-[32px] py-[48px] w-[220px] h-[328px] gap-[20px] rounded-2xl text-[17px] text-[#777E90] font-[700] shadow-2xl">
      {/* TODO: isActive 시 bold 지정하기*/}
      {category.map((item) => (
        <li
          key={item.id}
          onClick={() => onClickCategoryHandler(item.title)}
          className={`cursor-pointer ${
            isActive === item.title ? "font-bold text-black" : "font-[400]"
          }`}
        >
          {item.title}
        </li>
      ))}
    </ul>
  )
}

export default MemberCategory
