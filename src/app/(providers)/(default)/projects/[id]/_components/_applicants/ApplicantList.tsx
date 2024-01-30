import Image from "next/image"
import React from "react"
import { getMembers } from "../../api"
import ApplyButtons from "./ApplyButtons"
import Link from "next/link"

type Props = {
  applicant: Exclude<Awaited<ReturnType<typeof getMembers>>, null>[number]
  applicants: Exclude<Awaited<ReturnType<typeof getMembers>>, null>
  isWriter: boolean
}

const ApplicantList = ({ applicant, applicants, isWriter }: Props) => {
  return (
    <section
      key={applicant.id}
      className="border-2 border-slate-200 rounded-xl pl-5 pt-3 mt-5 mb-5 min-h-32 clear-left"
    >
      <div className="relative flex">
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
      <div className="absolute ml-[1060px] mt-[25px]">
        <Link className="text-stone-500" href={`/profile/${applicant.user_id}`}>
          자세히 보기
          <Image
            width={48}
            height={48}
            src="/icons/arrowUpRightIcon.png"
            alt="링크 이동 아이콘"
            className="w-8 h-8 object-none inline-block"
          />
        </Link>
      </div>
      <p className="my-1 mx-16">한줄 소개가 업데이트 될 예정입니다</p>
      {isWriter && (
        <ApplyButtons applicant={applicant} applicants={applicants} />
      )}
    </section>
  )
}

export default ApplicantList
