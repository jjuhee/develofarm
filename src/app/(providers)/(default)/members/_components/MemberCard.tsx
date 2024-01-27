import Image from "next/image"
import React from "react"
import useMembersStore from "@/store/members"
import { useCustomModal } from "@/hooks/useCustomModal"
import { useRouter } from "next/navigation"
import { UsersType } from "@/types/extendedType"

interface Props {
  user: UsersType
  title: string
  currentUserId: string
}

const MemberCard = ({ user, title, currentUserId }: Props) => {
  const router = useRouter()

  const { openCustomModalHandler } = useCustomModal()

  const { setViewMemberModal, setSelectedMember } = useMembersStore(
    (state) => state,
  )

  const { user_nickname, position, user_comment, user_tech } = user

  const onClickMemberCardHandler = () => {
    const handler = () => {
      router.push("/signin")
    }

    if (!currentUserId) {
      openCustomModalHandler(
        `로그인이 필요합니다.
        로그인 페이지로 이동하시겠습니까?`,
        "confirm",
        handler,
      )
    } else {
      setSelectedMember(user as UsersType)
      setViewMemberModal(true)
    }
  }

  return (
    <li
      className="flex flex-col justify-start w-[280px] h-[500px] rounded-3xl transition-all duration-200 cursor-pointer hover:scale-105"
      onClick={onClickMemberCardHandler}
    >
      <div className="mb-4 w-[280px] h-[280px] overflow-hidden">
        <Image
          src={user?.avatar_url || "/images/React.jpeg"}
          alt="user"
          width={300}
          height={300}
        />
      </div>
      <section className="flex flex-col z-1 p-[12px] gap-[7px] pb-5 ">
        <span className="text-[20px] font-[700] leading-[24px]">
          {user_nickname}
        </span>
        <span className="text-[16px] font-[700] text-[#80E500]  leading-[28px]">
          {position?.name}
        </span>
        <p className="w-full h-[50px] text-[16px] text-[#2D2D2D] font-[400] leading-[28px] mt-2 line-clamp-2">
          {user_comment ? user_comment : "한줄소개가 없습니다."}
        </p>
        <ul className="flex flex-wrap gap-[5px] mt-3">
          {(user_tech?.length as number) > 0 ? (
            <>
              {user_tech?.slice(0, 3).map((tech) => (
                <li
                  key={tech.techs?.id}
                  className="px-3 py-1 rounded-full bg-[#E6E6E6] text-[#2D2D2D] text-[12px] font-[400]"
                >
                  {tech.techs?.tech_name}
                </li>
              ))}
            </>
          ) : (
            <p className="text-gray-300"></p>
          )}
        </ul>
      </section>
    </li>
  )
}

export default MemberCard
