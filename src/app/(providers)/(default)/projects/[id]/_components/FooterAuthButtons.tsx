import { Tables } from "@/types/supabase"
import React from "react"

type Props = {
  project: Tables<"projects">
  isWriter: boolean
}

const FooterAuthButtons = ({ project, isWriter }: Props) => {
  return (
    <>
      {/* 글 작성자 여부에 따른 버튼 */}
      {isWriter ? (
        <button className="px-4 py-2 border-2 rounded-3xl border-slate-600 font-semibold">
          마감하기
        </button>
      ) : (
        <button className="px-4 py-2 border-2 rounded-3xl border-slate-600 font-semibold">
          신청하기
        </button>
      )}
    </>
  )
}

export default FooterAuthButtons
