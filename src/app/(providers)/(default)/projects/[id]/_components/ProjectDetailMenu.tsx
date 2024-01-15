import React from "react"
import { Tables } from "@/types/supabase"
import { getUser } from "../../api"
import { useQuery } from "@tanstack/react-query"
import { CiBookmark } from "react-icons/ci"
import { FaRegMessage } from "react-icons/fa6"
import { IoShareSocialOutline } from "react-icons/io5"
import { IoIosPeople } from "react-icons/io"
import { CiUser } from "react-icons/ci"

type Props = {
  project: Tables<"projects">
}

const ProjectDetailMenu = ({ project }: Props) => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  })

  console.log("현재유저", user)

  return (
    <>
      {user ? (
        <>
          <section className="mb-5 border-t-2 border-b-2 border-zinc-600 pt-10 pb-10 min-h-96">
            <div className="leading-7">{project.content}</div>
          </section>
          <section className="flex items-center">
            <span className="pr-12 pb-2 border-b-2">
              <FaRegMessage size={30} className="inline-block ml-10 mr-2" /> 24
            </span>
            <span className="pr-8 pb-1 border-b-2">
              <CiUser size={35} className="inline-block ml-8 mr-1" /> 24
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
              마감하기
            </button>
          </section>
        </>
      ) : (
        <>
          <section className="mb-5 border-t-2 border-b-2 border-zinc-600 pt-10 pb-10 min-h-96">
            <div className="leading-7">{project.content}</div>
          </section>
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
        </>
      )}
    </>
  )
}

export default ProjectDetailMenu
