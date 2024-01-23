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
  const { userId } = useUserStore()

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
        className="pr-8"
        onMouseOver={() => {
          setIsShow(true)
        }}
        onMouseLeave={() => {
          setIsShow(false)
        }}
      >
        {isShow && (applicants as unknown as any[])?.length > 0 && (
          <div className="absolute bg-[#B8FF65] text-[#000000] font-bold rounded-xl min-w-36 p-2 z-10 mt-[-60px] ml-8">
            {applicants?.map((applicant) => {
              return (
                <ul key={applicant.id} className="flex items-center">
                  <li>
                    <Image
                      width={24}
                      height={24}
                      src={`${applicant.users?.avatar_url}`}
                      alt="댓글 작성자 이미지"
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                  </li>
                  <li>
                    {applicant.users?.user_nickname}
                    <span className="ml-10">
                      {applicant.user_id === userId && "(나)"}
                    </span>
                  </li>
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
