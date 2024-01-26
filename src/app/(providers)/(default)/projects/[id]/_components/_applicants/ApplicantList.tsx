import Image from "next/image"
import React from "react"
import { getMembers } from "../../api"
import ApplyButtons from "./ApplyButtons"

type Props = {
  applicant: Exclude<Awaited<ReturnType<typeof getMembers>>, null>[number]
}

const ApplicantList = ({ applicant, applicants }: Props) => {
  /**
   *@ param 참여 중인 멤버 인원 수 */
  const applyApplications = applicants?.filter(
    (applicant) => applicant.application_status === true,
  )

  return (
    <section
      key={applicant.id}
      className="border-2 border-slate-200 rounded-xl pl-5 pt-3 mt-5 mb-5 min-h-32 clear-left"
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
        <span className="ml-4 mt-2 font-bold text-lg tracking-tighter">
          {applicant.users?.user_nickname}
        </span>
        <span className="ml-6 mt-4 text-[#80E500] font-semibold">
          {applicant.users?.positions?.name}
        </span>
      </div>
      <p className="my-1 mx-16">한줄 소개가 업데이트 될 예정입니다</p>
      <ApplyButtons applicant={applicant} applicants={applicants} />
    </section>
  )
}

export default ApplicantList
