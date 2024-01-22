import React from "react"
import { getMembers } from "../../api"
import Image from "next/image"

type Props = {
  applicant: Exclude<Awaited<ReturnType<typeof getMembers>>, null>[number]
}

const MembersInProject = ({ applicant }: Props) => {
  return (
    <section
      key={applicant.id}
      className="flex flex-col items-center mb-5 p-10 bg-[#F4F4F4] w-72 h-80 rounded-xl"
    >
      <p>
        <Image
          width={24}
          height={24}
          src={`${applicant.users?.avatar_url}`}
          alt="댓글 작성자 이미지"
          className="w-20 h-20 rounded-full object-contain inline-block"
        />
      </p>
      <p className="mt-5 font-bold text-xl">{applicant.users?.user_nickname}</p>
      <p className="mt-5 text-[#48484A]">
        한줄 소개가 업데이트 될<br />
        예정입니다
      </p>
    </section>
  )
}

export default MembersInProject
