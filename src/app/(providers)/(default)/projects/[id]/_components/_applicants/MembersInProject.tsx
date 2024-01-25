import React from "react"
import { getMembers } from "../../api"
import Image from "next/image"

type Props = {
  applicant: Exclude<Awaited<ReturnType<typeof getMembers>>, null>[number]
}

const MembersInProject = ({ applicant }: Props) => {
  return (
    <div className="float-left w-72 mr-6 overflow-x-auto scrollbar-thin scrollbar-track-black">
      <div
        key={applicant.id}
        className="flex flex-col items-center mb-6 py-8 px-5 bg-[#F4F4F4] w-72 h-80 rounded-xl"
      >
        <p>
          <Image
            width={24}
            height={24}
            src={`${applicant.users?.avatar_url}`}
            alt="댓글 작성자 이미지"
            className="w-20 h-20 rounded-full inline-block"
          />
        </p>
        <h3 className="mt-5 font-bold text-2xl">
          {applicant.users?.user_nickname}
        </h3>
        {applicant.users?.positions?.name === "백엔드" ||
        applicant.users?.positions?.name === "프론트엔드" ? (
          <h3 className="text-[#80E500] text-[1.1rem] font-semibold mt-1">
            {applicant.users?.positions?.name} 개발자
          </h3>
        ) : (
          <h3 className="text-[#80E500] text-[1.1rem] font-semibold mt-1">
            디자이너
          </h3>
        )}
        <p className="text-[#48484A]">
          한줄 소개가 업데이트 될<br />
          예정입니다
        </p>
        <ul className="flex text-sm">
          {applicant.users?.user_tech?.map((tech) => {
            return (
              <li
                className="p-2 pl-3 pr-3 mt-2 mr-2 rounded-3xl text-[#2D2D2D] bg-[#E6E6E6]"
                key={tech.id}
              >
                {tech.techs?.tech_name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default MembersInProject
