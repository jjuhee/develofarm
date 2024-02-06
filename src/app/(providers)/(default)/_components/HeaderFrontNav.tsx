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

  return (
    <nav className="hidden lg:flex lg:gap-[89px]">
      <Link
        href={"/projects"}
        className={`text-black text-[18px] ${
          segment === "projects"
            ? "font-bold border-b-2 border-b-main-lime"
            : "font-medium"
        }`}
      >
        프로젝트 구인
      </Link>
      <Link
        href={"/members"}
        className={`text-black text-[18px] ${
          segment === "members"
            ? "font-bold border-b-2 border-b-main-lime"
            : "font-medium"
        }`}
        onClick={onClickMemberCategoryHandler}
      >
        인재풀
      </Link>
    </nav>
  )
}

export default HeaderFrontNav
