"use client"

import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import React from "react"
import type { Tables } from "@/types/supabase"

interface Props {
  positions: Tables<"positions">[]
}

interface TCategoryHandler {
  title?: string
  position?: Tables<"positions">
}

const MemberCategory = ({ positions }: Props) => {
  const { selectCategory, category } = useCategoryStore((state) => state)
  const { setMemberPosition } = useMembersStore((state) => state)

  const onClickCategoryHandler = ({ title, position }: TCategoryHandler) => {
    /** 전체보기 선택했을 때 */
    if (title) {
      selectCategory(title)
      setMemberPosition(null)
      /** position 카테고리를 선택했을 때 */
    } else if (position) {
      selectCategory(position.name)
      setMemberPosition(position)
    } else return

    window.scroll({
      top: 0,
    })
  }

  return (
    <ul className="flex py-[20px] gap-[20px] text-[17px] text-[#777E90] font-[700]">
      <li
        onClick={() => onClickCategoryHandler({ title: "전체보기" })}
        className={`cursor-pointer py-2 px-4 ${
          category === "전체보기"
            ? "font-bold text-black bg-main-lime"
            : "font-[400] border-[1.5px] border-[#EAEAEA] text-[#666666]"
        }`}
      >
        전체보기
      </li>
      {positions?.map((position) => (
        <li
          key={position.id}
          onClick={() => onClickCategoryHandler({ position })}
          className={`cursor-pointer py-2 px-4 ${
            category === position.name
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
