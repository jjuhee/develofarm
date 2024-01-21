import Image from "next/image"
import React from "react"
import { getMembers } from "../../api"
import ApplyButtons from "./ApplyButtons"

type Props = {
  applicant: Exclude<Awaited<ReturnType<typeof getMembers>>, null>[number]
}

const ApplicantList = ({ applicant }: Props) => {
  return (
    <section
      key={applicant.id}
      className="border-2 border-slate-200 rounded-xl pl-5 pt-3 mt-5 mb-5 min-h-32"
    >
      <div className="flex">
        <p>
          <Image
            width={48}
            height={48}
            src={`${applicant.users?.avatar_url}`}
            alt="댓글 작성자 이미지"
            className="w-12 h-12 rounded-full object-cover inline-block"
          />
        </p>
        <span className="ml-4 mt-2 font-bold">
          {applicant.users?.user_nickname}
        </span>
      </div>
      <p className="m-3">한줄 소개가 업데이트 될 예정입니다</p>
      <ApplyButtons applicant={applicant} />
    </section>
  )
}

export default ApplicantList
