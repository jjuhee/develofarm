import React from "react"
import { getMembers, removeProjectInMember } from "../../api"
import Image from "next/image"
import { getProject } from "../../../api"
import RemoveParticipatingMemberButton from "./RemoveParticipatingMemberButton"
import Link from "next/link"
import Spacer from "@/components/ui/Spacer"

type Props = {
  participatingApplications: Exclude<
    Awaited<ReturnType<typeof getMembers>>,
    null
  >
  project: Exclude<Awaited<ReturnType<typeof getProject>>, null>
  isWriter: boolean
}

const ParticipatingMembers = ({
  participatingApplications,
  project,
  isWriter,
}: Props) => {
  return (
    <section className="w-72 mr-6">
      <Spacer y={10} />
      <article>
        {participatingApplications.length > 0 ? (
          <h2 className="text-2xl font-bold mb-5">
            참여 중인 멤버
            <span className="text-slate-300 ml-5 px-1">
              {participatingApplications.length}
            </span>
            /<span className="px-1">{project?.number_of_people}</span>
          </h2>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-5">참여 중인 멤버</h2>
            <p className="flex items-center justify-center text-xl text-center font-semibold p-10 ml-2 mt-5 mb-10 w-[600px] lg:w-[1180px] h-[300px] bg-[#F4F4F4] rounded-xl">
              참여 중인 멤버가 없습니다.
            </p>
          </>
        )}
      </article>
      <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[1200px]">
        {participatingApplications.map((participating) => {
          return (
            <article
              key={participating.id}
              className="relative flex flex-col items-center mb-6 py-7 bg-[#F4F4F4] w-[280px] h-[360px] rounded-xl"
            >
              {isWriter && (
                <RemoveParticipatingMemberButton
                  participating={participating}
                />
              )}
              <p>
                <Image
                  width={90}
                  height={90}
                  src={`${participating.users?.avatar_url}`}
                  alt="참여 멤버 이미지"
                  className="rounded-full inline-block"
                />
              </p>
              <h3 className="mt-5 font-bold text-2xl">
                {participating.users?.user_nickname}
              </h3>
              {participating.users?.positions?.name === "백엔드" ||
              participating.users?.positions?.name === "프론트엔드" ? (
                <h3 className="text-[#80E500] font-semibold mt-1 text-xl">
                  {participating.users?.positions?.name} 개발자
                </h3>
              ) : (
                <h3 className="text-[#80E500] text-[1.1rem] font-semibold mt-1 text-xl">
                  디자이너
                </h3>
              )}
              <p className="text-[#48484A] w-[200px] whitespace-normal h-auto mt-2 text-xl">
                {participating.appeal_message}
              </p>
              <ul className="flex text-lg">
                {participating.users?.user_tech?.slice(0, 3).map((tech) => {
                  return (
                    <li
                      key={tech.id}
                      className="w-auto text-base p-2 pl-3 pr-3 mt-2 mr-2 rounded-3xl text-[#2D2D2D] bg-[#E6E6E6]"
                    >
                      {tech.techs?.tech_name}
                    </li>
                  )
                })}
                {(participating?.users?.user_tech as unknown as any[]).length >
                  3 && (
                  <li className="group relative text-lg font-normal ">
                    <div className="flex justify-center items-center bg-[#E6E6E6] text-[#636366] px-3 py-1 mt-2 rounded-3xl">
                      ...
                    </div>
                    <div className="hidden group-hover:block">
                      <ul className="absolute right-0 top-[40px] flex items-center gap-3 h-[35px] py-2 px-3 bg-[#E6E6E6] text-[#636366] rounded-lg z-10 ">
                        {participating.users?.user_tech
                          ?.slice(3)
                          .map((tech, i) => (
                            <li
                              key={i}
                              className=" bg-[#E6E6E6] text-[#636366] text-lg font-normal rounded-3xl"
                            >
                              {tech?.techs?.tech_name}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
              <Link
                className="absolute text-stone-500 mt-[300px] ml-[20px] text-xl"
                href={`/profile/${participating.user_id}`}
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
            </article>
          )
        })}
      </article>
    </section>
  )
}

export default ParticipatingMembers
