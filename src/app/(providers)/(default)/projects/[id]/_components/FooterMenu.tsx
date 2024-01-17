import { Tables } from "@/types/supabase"
import React, { SetStateAction, useState } from "react"
import { CiBookmark } from "react-icons/ci"
import { IoShareSocialOutline } from "react-icons/io5"
import { IoIosPeople } from "react-icons/io"
import { FaRegMessage } from "react-icons/fa6"
import { CiUser } from "react-icons/ci"
import Comments from "./Comments"
import Applicants from "./Applicants"
import Spacer from "@/components/ui/Spacer"
import FooterAuthButtons from "./FooterAuthButtons"

type Props = {
  project: Tables<"projects">
}

const FooterMenu = ({ project }: Props) => {
  /**
   *@ param 댓글목록과 신청자목록에 상태값을 담은 변수*/
  const [isSelected, setIsSelected] = useState<"comments" | "applicants">(
    "comments",
  )
  /**
   *@ param1 현재 로그인한 유저 정보를 담은 변수
   *@ param2 글 작성자가 현재 로그인한 유저랑 같은지 판별하는 변수*/
  const currentUser = localStorage.getItem("sb-aksbymviolrkiainilpq-auth-token")
    ? JSON.parse(localStorage.getItem("sb-aksbymviolrkiainilpq-auth-token")!)
    : null
  const isWriter = currentUser?.user?.id === project.user_id

  /**
   *@ function 클릭시 탭메뉴 선택 */
  const toggleTapHandler = (
    tabName: SetStateAction<"comments" | "applicants">,
  ) => {
    setIsSelected(tabName)
  }

  return (
    <>
      <section className="flex items-center">
        {/* 글 작성자 여부에 따른 하단 메뉴 */}
        {isWriter ? (
          <>
            <button
              className={`pr-12 pb-2 border-b-2 ${
                isSelected === "comments" && " border-slate-600"
              }`}
              onClick={() => toggleTapHandler("comments")}
            >
              <FaRegMessage size={30} className="inline-block ml-10 mr-2" /> 24
            </button>
            <button
              className={`pr-8 pb-1 border-b-2 ${
                isSelected === "applicants" && " border-slate-600"
              }`}
              onClick={() => toggleTapHandler("applicants")}
            >
              <CiUser size={35} className="inline-block ml-8 mr-1" /> 24
            </button>
          </>
        ) : (
          <>
            <span className="pr-14">
              <FaRegMessage size={30} className="inline-block ml-10 mr-2" /> 24
            </span>
            <span className="pr-8">
              <IoIosPeople size={40} className="inline-block ml-8 mr-1" />{" "}
              모집정원 3/{project.number_of_people}
            </span>
          </>
        )}
        <span className="ml-auto pr-5">
          <span>
            <CiBookmark size={30} className="inline-block" />
          </span>
          5
        </span>
        <span className="pr-5">
          <IoShareSocialOutline size={30} />
        </span>
        {/* 글 작성자 여부에 따른 버튼 */}
        {isWriter ? (
          <button className="px-4 py-2 border-2 rounded-3xl border-slate-600 font-semibold">
            마감하기
          </button>
        ) : (
          <button className="px-4 py-2 border-2 rounded-3xl border-slate-600 font-semibold">
            참여 신청
          </button>
        )}
        {/* <FooterAuthButtons isWriter={isWriter} /> */}
      </section>
      <Spacer y={35} />
      {/* 탭 메뉴에 따라 나오는 컴포넌트 */}
      <section>
        {isSelected === "comments" && <Comments />}
        {isSelected === "applicants" && <Applicants />}
      </section>
    </>
  )
}

export default FooterMenu
