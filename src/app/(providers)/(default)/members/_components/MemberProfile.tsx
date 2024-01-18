import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import useMembersStore from "@/store/members"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { getProjectByUserId, getTechsByUserId } from "../api"
import { Tables } from "@/types/supabase"
import { supabaseForClient } from "@/supabase/supabase.client"

const MemberProfile = () => {
  const dropdownRef = useRef<HTMLInputElement>(null)

  const [currentUser, setCurrentUser] = useState("")

  useEffect(() => {
    const getAuth = async () => {
      const newUser = await supabaseForClient.auth.getUser()
      console.log(newUser.data.user?.id)
      setCurrentUser(newUser.data.user?.id as string)
    }
    getAuth()
  }, [])

  const { selectedMember } = useMembersStore((state) => state)

  const [isActive, setIsActive] = useState(false)

  useOnClickOutSide({ ref: dropdownRef, handler: () => setIsActive(false) })

  const { data: projects } = useQuery({
    queryKey: ["projects", currentUser],
    queryFn: () => getProjectByUserId(currentUser),
    enabled: !!currentUser,
  })

  const { data: userTechs } = useQuery({
    queryKey: ["techs", selectedMember.id],
    queryFn: () => getTechsByUserId(selectedMember.id),
    enabled: !!selectedMember,
  })

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
              className=" flex items-center gap-2 bg-black py-2 pl-6 pr-4 rounded-3xl text-white cursor-pointer"
              onClick={() => setIsActive(!isActive)}
            >
              내 프로젝트에 초청하기
              <span>
                {isActive ? (
                  <IoIosArrowUp className="text-[20px]" />
                ) : (
                  <IoIosArrowDown className="text-[20px]" />
                )}
              </span>
            </p>

            <ul
              className={`flex flex-col gap-2 absolute py-[15px] px-[20px] border-2 w-full mt-2 rounded-2xl transition-all ${
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
                      <span className="text-[10px] font-[700] px-3 py-1 rounded-2xl text-center text-white bg-black cursor-pointer">
                        초청
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
                    {/* TODO: 프로젝트 게시 페이지로 연결 */}새 프로젝트 올리기{" "}
                    {"->"}
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
          {(userTechs?.length as number) > 0 ? (
            <>
              {userTechs?.map((tech, i) => (
                <li
                  key={i}
                  className="text-[16px] font-[500] py-1 px-3 border-gray-70 border-2 rounded-3xl"
                >
                  {tech}
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
        <p className="text-[15px] font-[400] ">
          {selectedMember.user_comment
            ? selectedMember.user_comment
            : "현재 소개글이 없습니다."}
        </p>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h3 className="text-[18px] font-[700]">포트폴리오</h3>
        <p>업데이트 예정입니다.</p>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-[18px] font-[700]">Blog</h3>
          <p>blog 주소</p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-[18px] font-[700]">GitHub</h3>
          <p>GitHub 주소</p>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Link
          href={`/profile/${selectedMember?.id}`}
          className="border-2 border-black py-2 px-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
        >
          자세히 보기
        </Link>
      </div>
    </>
  )
}

export default MemberProfile
