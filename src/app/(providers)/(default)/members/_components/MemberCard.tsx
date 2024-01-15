import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import React, { useEffect, useRef } from "react"
import { getPositionById, getTechsByUserId } from "../api"
import { Tables } from "@/types/supabase"
import useMembersStore from "@/store/members"
import MemberProfile from "./MemberProfile"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"

interface Props {
  user: Tables<"users">
  title: string
}

const MemberCard = ({ user, title }: Props) => {
  const { setViewMemberModal, setSelectedMember, setMemberPosition } =
    useMembersStore((state) => state)

  const { data: position } = useQuery({
    queryKey: ["position", user.positionId],
    queryFn: () => getPositionById({ positionId: user?.positionId as string }),
    enabled: !!user.positionId,
    select: (position) => position?.[0],
  })

  const { data: userTechs } = useQuery({
    queryKey: ["techs", user.id],
    queryFn: () => getTechsByUserId(user.id),
    enabled: !!user,
  })

  const openModalHandler = () => {
    setSelectedMember(user)
    setMemberPosition(position as Tables<"positions">)
    setViewMemberModal(true)
  }

  return (
    <>
      {(title === "전체보기" || title === user.position?.name) && (
        <li
          className="relative flex justify-center items-end  w-[280px] h-[380px] rounded-3xl my-[20px] shadow-2xl mt-20 transition-all duration-200 cursor-pointer hover:scale-105"
          onClick={openModalHandler}
        >
          <section className="flex flex-col z-1 p-[12px] gap-[5px] items-center pb-5 px-10 ">
            <span className="text-[20px] font-[700] leading-[24px]">
              {user.user_nickname}
            </span>
            <span className="text-[16px] font-[500] leading-[28px]">
              {user.position?.name}
            </span>
            <p className="w-full text-[14px] font-[400] leading-[28px] text-center">
              {user?.user_comment ? user?.user_comment : "한줄소개가 없습니다."}
            </p>
            <ul className="flex gap-[5px] mt-3">
              {(userTechs?.length as number) > 0 ? (
                <>
                  {userTechs?.map((tech, i) => (
                    <li
                      key={i}
                      className="px-3 py-1 rounded-full border-2 text-[12px] font-[400]"
                    >
                      {tech}
                    </li>
                  ))}
                </>
              ) : (
                <p className="text-gray-300">현재 보유기술이 없습니다.</p>
              )}
            </ul>
          </section>
          <div className="absolute z-10 top-[-70px] w-[230px] h-[230px] bg-gray-200 rounded-full shadow-2xl shadow-gray-300">
            <Image
              src={user.avatar_url || "/images/React.jpeg"}
              alt="user"
              fill
              sizes="auto"
              className="object-cover overflow-hidden w-full h-full transition group-hover:scale-110 rounded-full "
            />
          </div>
        </li>
      )}
    </>
  )
}

export default MemberCard
