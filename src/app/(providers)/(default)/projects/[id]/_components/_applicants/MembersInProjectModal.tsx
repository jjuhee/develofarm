import React, { useState } from "react"
import Image from "next/image"
import { IoIosPeople } from "react-icons/io"
import useUserStore from "@/store/user"
import { useQuery } from "@tanstack/react-query"
import { Tables } from "@/types/supabase"
import { getMembersInProject } from "../../api"

type Props = {
  project: Tables<"projects">
}

const MembersInProjectModal = ({ project }: Props) => {
  /**
   *@ param 신청자 목록 hover시 나타나는 사용자 목록 div를 담은 변수*/
  const [isShow, setIsShow] = useState<boolean>(false)
  const { user } = useUserStore((state) => state)

  /**
   *@ query 해당 게시물 id를 구분하고 신청자 목록 조회 */
  const { data: applicants, isLoading: applicantsIsLoading } = useQuery({
    queryKey: ["applicants", { projectId: project.id }],
    queryFn: () => getMembersInProject(project.id),
  })

  if (applicantsIsLoading) return <div>is Loading...</div>
  return (
    <>
      <button
        disabled
        className="pr-8 relative"
        onMouseOver={() => {
          setIsShow(true)
        }}
        onMouseLeave={() => {
          setIsShow(false)
        }}
      >
        {isShow && (applicants as unknown as any[])?.length > 0 && (
          <div className="absolute max-h-60 h-auto overflow-y-scroll bg-[#B8FF65] text-[#000000] font-bold rounded-xl min-w-36 p-2 z-10 bottom-[50px] left-[12px] ml-2 shadow-[0px_-5px_15px_-5px_rgba(0,0,0,0.3)]  after:content-[''] after:absolute after:top-[70px] after:right-[105px] after:border-l-transparent after:border-l-[10px] after:border-r-[10px] after:border-r-transparent after:border-b-transparent after:border-t-[#B8FF65] after:border-t-[10px] --var(--tw-shadow-color) scrollbar-thin scrollbar-thumb-[#000000]">
            {applicants?.map((applicant) => {
              return (
                <ul key={applicant.id} className="flex items-center p-2">
                  <li>
                    <Image
                      width={24}
                      height={24}
                      src={`${applicant.users?.avatar_url}`}
                      alt="댓글 작성자 이미지"
                      className="w-8 h-8 rounded-full"
                    />
                  </li>
                  <li
                    className="truncate w-28 text-ellipsis ml-2 mt-1 text-left"
                    title={`${applicant.users?.user_nickname}`}
                  >
                    {applicant.users?.user_nickname}
                  </li>
                  <span className="absolute ml-28">
                    {applicant.user_id === user?.id && "(나)"}
                  </span>
                </ul>
              )
            })}
          </div>
        )}
        <IoIosPeople size={40} className="inline-block ml-8 mr-1" />
        모집정원 {applicants?.length}/{project.number_of_people}
      </button>
    </>
  )
}

export default MembersInProjectModal
