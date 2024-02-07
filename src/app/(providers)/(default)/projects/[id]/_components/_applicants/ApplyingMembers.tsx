import Image from "next/image"
import Link from "next/link"
import React from "react"
import AuthorizeActionButtons from "./AuthorizeActionButtons"
import Spacer from "@/components/ui/Spacer"
import { TProjectMembersType } from "@/types/extendedType"
import { timeForToday } from "@/utils/formatDate"

type Props = {
  applyingApplications: TProjectMembersType
  participatingApplications: TProjectMembersType
  isWriter: boolean
}

const ApplyingMembers = ({
  applyingApplications,
  participatingApplications,
  isWriter,
}: Props) => {
  return (
    <section>
      <Spacer y={20} />
      {applyingApplications.length > 0 ? (
        <h2 className="text-2xl font-bold clear-end mb-5">
          신청자 현황
          <span className="ml-3">{applyingApplications.length}</span>
        </h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-5">신청자 현황</h2>
          <p className="flex items-center justify-center text-xl text-center font-semibold p-10 ml-2 w-[600px] lg:w-[1200px] h-[300px] bg-[#F4F4F4] rounded-xl">
            신청한 사람이 없습니다.
          </p>
        </>
      )}

      {applyingApplications.map((applying) => {
        return (
          <article
            key={applying.id}
            className="border border-[#E6E6E6] shadow-md rounded-xl p-[25px] mt-5 mb-5 h-[180px] relative w-[590px] lg:w-[1200px]"
          >
            <div className="relative flex w-[900px]">
              <p>
                <Image
                  width={52}
                  height={52}
                  src={`${applying.users?.avatar_url}`}
                  alt="댓글 작성자 이미지"
                  className="rounded-full object-cover inline-block"
                />
              </p>
              <span className="ml-6 mt-2 font-bold text-2xl tracking-tighter">
                {applying.users?.user_nickname}
              </span>
              <span className="ml-6 mt-4 text-[#80E500] font-semibold text-lg">
                {applying.users?.positions?.name === "디자인"
                  ? "디자이너"
                  : applying.users?.positions?.name}
              </span>
              <span className="ml-[10px] mt-4 text-lg">
                {timeForToday(applying.created_at)}
              </span>
            </div>
            <p className="mx-[73px] mb-[-4px] lg:mb-6 text-xl whitespace-normal w-[400px] lg:w-[700px]">
              {applying.appeal_message}
            </p>
            <div className="absolute ml-[450px] lg:ml-[1060px] mt-[15px]">
              <Link
                className="text-stone-500 text-lg"
                href={`/profile/${applying.user_id}`}
              >
                자세히 보기
                <Image
                  width={14}
                  height={14}
                  src="/icons/arrowUpRightIcon.png"
                  alt="링크 이동 아이콘"
                  className="object-none inline-block ml-1"
                />
              </Link>
            </div>
            <ul className="flex ml-[68px] text-lg w-[350px] lg:w-[980px] whitespace-pre-line">
              {applying.users?.user_tech?.slice(0, 3).map((tech) => {
                return (
                  <li key={tech.id} className="w-auto px-2 mt-2 text-[#A6A6A6]">
                    {tech.techs?.tech_name}
                  </li>
                )
              })}
            </ul>
            {isWriter && (
              <AuthorizeActionButtons
                applying={applying}
                participatingApplications={participatingApplications}
              />
            )}
          </article>
        )
      })}
    </section>
  )
}

export default ApplyingMembers
