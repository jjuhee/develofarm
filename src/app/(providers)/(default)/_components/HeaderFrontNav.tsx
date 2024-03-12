import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import React from "react"

const HeaderFrontNav = () => {
  const segment = useSelectedLayoutSegment()
  const { selectCategory } = useCategoryStore((state) => state)
  const { setViewMemberModal, setMemberPosition } = useMembersStore(
    (state) => state,
  )

  /** 인재풀 카테고리 선택 시 초기화 핸들러 */
  const onClickMemberCategoryHandler = () => {
    selectCategory("전체보기")
    setViewMemberModal(false)
    setMemberPosition(null)
  }

  console.log("segment", segment)

  return (
    <nav className="hidden md:flex md:gap-[89px]">
      <Link
        href={"/projects"}
        className={`text-black text-[18px] ${
          segment === "projects"
            ? "font-bold pt-5 pb-2 border-b-8 border-b-main-lime"
            : "font-medium pt-5 pb-2"
        }`}
      >
        프로젝트 구인
      </Link>
      <Link
        href={"/members"}
        className={`text-black text-[18px] ${
          segment === "members"
            ? "font-bold pt-5 pb-2 border-b-8 border-b-main-lime"
            : "font-medium pt-5 pb-2"
        }`}
        onClick={onClickMemberCategoryHandler}
      >
        인재풀
      </Link>
    </nav>
  )
}

export default HeaderFrontNav
