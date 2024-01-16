import { Tables } from "@/types/supabase"
import React, { useState } from "react"
import { CiBookmark } from "react-icons/ci"
import { IoShareSocialOutline } from "react-icons/io5"
import { IoIosPeople } from "react-icons/io"
import { FaRegMessage } from "react-icons/fa6"
import { CiUser } from "react-icons/ci"

type Props = {
  project: Tables<"projects">
}

const ProjectDetailFooter = ({ project }: Props) => {
  const [isSelected, setIsSelected] = useState(0)
  const tapMenu = [
    { id: 1, title: "댓글 총 갯수", component: FaRegMessage },
    { id: 2, title: "총 신청자 수", component: CiUser },
  ]
  /**
   *@ param1 현재 로그인한 유저 정보를 담은 변수입니다
   *@ param2 글 작성자가 현재 로그인한 유저랑 같은지 판별하는 변수입니다*/
  const currentUser = localStorage.getItem("sb-aksbymviolrkiainilpq-auth-token")
    ? JSON.parse(localStorage.getItem("sb-aksbymviolrkiainilpq-auth-token")!)
    : null
  const isWriter = currentUser?.user?.id === project.user_id

  const onToggleHandler = (index: number) => {
    setIsSelected(index)
  }

  return (
    <>
      {isWriter ? (
        <section className="flex items-center">
          {tapMenu.map((menu, index) => {
            return (
              <span
                key={menu.id}
                className={
                  index === isSelected
                    ? "pr-12 pb-2 border-b-2 border-slate-600 cursor-pointer"
                    : "pr-12 pb-2 border-b-2 cursor-pointer"
                }
                onClick={() => onToggleHandler(index)}
              >
                <menu.component size={30} className="inline-block ml-10 mr-2" />
                {menu.title}
                {/* <CiUser size={35} className="inline-block ml-8 mr-1" /> 24 */}
              </span>
            )
          })}
          <span className="ml-auto pr-5">
            <span>
              <CiBookmark size={30} className="inline-block" />
            </span>
            5
          </span>
          <span className="pr-5">
            <IoShareSocialOutline size={30} />
          </span>
          <button className="px-4 py-2 border-2 rounded-3xl border-slate-600 font-semibold">
            마감하기
          </button>
        </section>
      ) : (
        <section className="flex items-center">
          <span className="pr-14">
            <FaRegMessage size={30} className="inline-block ml-10 mr-2" /> 24
          </span>
          <span className="pr-8">
            <IoIosPeople size={40} className="inline-block ml-8 mr-1" />{" "}
            모집정원 3/{project.number_of_people}
          </span>
          <span className="ml-auto pr-5">
            <span>
              <CiBookmark size={30} className="inline-block" />
            </span>
            5
          </span>
          <span className="pr-5">
            <IoShareSocialOutline size={30} />
          </span>
          <button className="px-4 py-2 border-2 rounded-3xl border-slate-600 font-semibold">
            참여 신청
          </button>
        </section>
      )}
    </>
  )
}

export default ProjectDetailFooter
