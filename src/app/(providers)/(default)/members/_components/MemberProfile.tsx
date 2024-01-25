import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import useMembersStore from "@/store/members"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { getProjectByUserId } from "../api"
import { Tables } from "@/types/supabase"

interface Props {
  currentUserId: string
}

const MemberProfile = ({ currentUserId }: Props) => {
  const dropdownRef = useRef<HTMLInputElement>(null)

  const selectedMember = useMembersStore((state) => state.selectedMember)

  const [isActive, setIsActive] = useState(false)

  useOnClickOutSide({ ref: dropdownRef, handler: () => setIsActive(false) })

  const { data: projects } = useQuery({
    queryKey: ["projects", currentUserId],
    queryFn: () => getProjectByUserId(currentUserId),
    enabled: !!currentUserId,
  })

  const onClickToProfilePageHandler = () => {
    window.scroll({
      top: 0,
    })
  }

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex  items-center">
          <div className="relative w-[123px] h-[123px] bg-gray-300 rounded-full mr-10">
            <Image
              src={
                (selectedMember.avatar_url as string) || "/images/React.jpeg"
              }
              alt="member"
              sizes="auto"
              fill
              className="absolute object-cover overflow-hidden rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[30px] font-[700]">
              {selectedMember.user_nickname}
            </h3>
            <p className="text-[20px] font-[600]">
              {selectedMember.position?.name || "포지션을 정해주세요."}
            </p>
          </div>
        </div>
        <div className="flex h-full mb-8" ref={dropdownRef}>
          <div className="relative">
            <p
              className=" flex items-center gap-2 bg-main-lime py-2 pl-6 pr-4 rounded-lg text-black font-[600] cursor-pointer"
              onClick={() => setIsActive(!isActive)}
            >
              내 프로젝트에 초대하기
              <span>
                {isActive ? (
                  <IoIosArrowUp className="text-[20px]" />
                ) : (
                  <IoIosArrowDown className="text-[20px]" />
                )}
              </span>
            </p>

            <ul
              className={`flex flex-col gap-2 absolute bg-black text-white py-[15px] px-[20px] border-2 w-full mt-2 rounded-2xl transition-all ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {(projects?.length as number) > 0 ? (
                <>
                  {projects?.map((project: Tables<"projects">) => (
                    <li
                      className="flex items-center justify-between "
                      key={project.id}
                    >
                      <p className="text-[15px] font-[500]">{project.title}</p>
                      <span className="text-[10px] font-[700] px-3 py-1 rounded-md text-center text-white bg-black border-[1.5px] border-white cursor-pointer hover:bg-[#CCCCCC] hover:text-black hover:border-black transition-all duration-300">
                        초대
                      </span>
                    </li>
                  ))}
                </>
              ) : (
                <div>
                  <p className="text-[15px] font-[500]">
                    현재 초청할 수 있는 프로젝트가 없습니다.
                  </p>
                  <Link
                    href={"/write"}
                    className="text-[11px] font-[700] px-3 py-1 rounded-2xl text-center text-white bg-black cursor-pointer"
                  >
                    새 프로젝트 올리기 {"->"}
                  </Link>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h3 className="text-[18px] font-[700]">보유 기술</h3>
        <ul className="flex gap-5 items-center">
          {(selectedMember?.user_tech?.length as number) > 0 ? (
            <>
              {selectedMember?.user_tech?.map((tech) => (
                <li
                  key={tech.techs.id}
                  className="text-[14px] text-[#636366] font-[500] bg-[#E6E6E6] py-1 px-3 border-gray-70 border-2 rounded-3xl"
                >
                  {tech?.techs?.tech_name}
                </li>
              ))}
            </>
          ) : (
            <p className="text-[16px] text-gray-500">
              현재 보유기술이 없습니다.
            </p>
          )}
        </ul>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h3 className="text-[18px] font-[700]">소개글</h3>
        <p className="text-[14px] font-[300] ">
          {selectedMember.user_comment
            ? selectedMember.user_comment
            : "현재 소개글이 없습니다."}
        </p>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h3 className="text-[18px] font-[700]">포트폴리오</h3>
        <p className="text-[14px] font-[300]">업데이트 예정입니다.</p>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-[18px] font-[700]">Blog</h3>
          <a
            href={selectedMember.social_link?.blog_url as string}
            className="text-[14px] font-[600]"
          >
            {selectedMember.social_link?.blog_url || "Blog link가 없습니다."}
          </a>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-[18px] font-[700]">GitHub</h3>
          <a
            href={selectedMember.social_link?.github_url as string}
            className="text-[14px] font-[600]"
          >
            {selectedMember.social_link?.github_url ||
              "GitHub link가 없습니다."}
          </a>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Link
          href={`/profile/${selectedMember?.id}`}
          className="border-2 border-[#A6A6A6] text-[15px] py-2 px-4 mt-2 rounded-lg cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
          onClick={onClickToProfilePageHandler}
        >
          자세히 보기
        </Link>
      </div>
    </>
  )
}

export default MemberProfile
