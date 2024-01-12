import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import React from "react"
import { getPositionById } from "../api"
import { Tables } from "@/types/supabase"
import useMembersStore from "@/store/members"

interface Props {
  user: Tables<"users">
  title: string
}

const MemberCard = ({ user, title }: Props) => {
  const { setViewMemberModal, selectMember } = useMembersStore((state) => state)

  const { data: position } = useQuery({
    queryKey: ["position", user.positionId],
    queryFn: () => getPositionById({ positionId: user?.positionId as string }),
    enabled: !!user.positionId,
    select: (position) => position?.[0],
  })

  const openModalHandler = () => {
    selectMember(user)
    setViewMemberModal(true)
  }

  return (
    <>
      {(title === "전체보기" || title === position?.position_name) && (
        <li
          className="relative flex justify-center items-end  w-[280px] h-[380px] rounded-3xl my-[20px] shadow-2xl mt-20 transition-all duration-200 cursor-pointer hover:scale-105"
          onClick={openModalHandler}
        >
          <section className="flex flex-col z-1 p-[12px] gap-[5px] items-center pb-5 px-10 ">
            <span className="text-[20px] font-[700] leading-[24px]">
              {user.user_nickname}
            </span>
            <span className="text-[16px] font-[500] leading-[28px]">
              {position?.position_name}
            </span>
            <p className="w-full text-[14px] font-[400] leading-[28px] text-center">
              저는 언제나 새로운 도전을 하는 프론트엔드 개발자입니다.
            </p>
            <div className="flex gap-[5px] mt-3">
              <span className="px-3 py-1 rounded-full border-2 text-[12px] font-[400]">
                React
              </span>
              <span className="px-3 py-1 rounded-full border-2 text-[12px] font-[400]">
                NextJS
              </span>
            </div>
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
