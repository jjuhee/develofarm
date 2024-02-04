import Image from "next/image"
import Link from "next/link"
import React from "react"
import { getMembers } from "../../api"
import AuthorizeActionButtons from "./AuthorizeActionButtons"

type Props = {
  applyingApplications: Exclude<Awaited<ReturnType<typeof getMembers>>, null>
  participatingApplications: Exclude<
    Awaited<ReturnType<typeof getMembers>>,
    null
  >
  isWriter: boolean
}

const ApplyingMembers = ({
  applyingApplications,
  participatingApplications,
  isWriter,
}: Props) => {
  return (
    <section>
      {applyingApplications.length > 0 ? (
        <h2 className="text-2xl font-bold clear-end">
          신청자 현황
          <span className="ml-3">{applyingApplications.length}</span>
        </h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-5">신청자 현황</h2>
          <p className="flex items-center justify-center text-2xl text-center font-semibold p-10 ml-2 mt-5 mb-10 w-[1200px] h-[300px] bg-[#F4F4F4] rounded-xl">
            신청한 사람이 없습니다!
          </p>
        </>
      )}

      {applyingApplications.map((applying) => {
        return (
          <article
            key={applying.id}
            className="border-2 border-slate-200 rounded-xl pl-5 pt-3 mt-5 mb-5 min-h-32 clear-left relative"
          >
            <div className="relative flex w-[300px]">
              <p>
                <Image
                  width={52}
                  height={52}
                  src={`${applying.users?.avatar_url}`}
                  alt="댓글 작성자 이미지"
                  className="rounded-full object-cover inline-block"
                />
              </p>
              <span className="ml-4 mt-2 font-bold text-lg tracking-tighter">
                {applying.users?.user_nickname}
              </span>
              <span className="ml-6 mt-4 text-[#80E500] font-semibold">
                {applying.users?.positions?.name}
              </span>
            </div>
            <div className="absolute ml-[1060px] mt-[25px]">
              <Link
                className="text-stone-500"
                href={`/profile/${applying.user_id}`}
              >
                자세히 보기
                <Image
                  width={48}
                  height={48}
                  src="/icons/arrowUpRightIcon.png"
                  alt="링크 이동 아이콘"
                  className="object-none inline-block"
                />
              </Link>
            </div>
            <p className="my-1 mx-16 whitespace-normal w-[700px]">
              {applying.appeal_message}
            </p>
            <ul className="flex text-sm">
              {applying.users?.user_tech?.slice(0, 3).map((tech) => {
                return (
                  <li
                    key={tech.id}
                    className="w-auto text-xs p-2 pl-3 pr-3 mt-2 mr-2 text-[#2D2D2D]"
                  >
                    {tech.techs?.tech_name}
                  </li>
                )
              })}
            </ul>
            {isWriter && (
              <AuthorizeActionButtons
                applying={applying}
                applyingApplications={applyingApplications}
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
