import Image from "next/image"
import React from "react"
import useMembersStore from "@/store/members"
import { useCustomModal } from "@/hooks/useCustomModal"
import { useRouter } from "next/navigation"
import { ExtendedUsersType } from "@/types/extendedType"

interface Props {
  user: ExtendedUsersType
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
      setSelectedMember(user as ExtendedUsersType)
      setViewMemberModal(true)
    }
  }

  return (
    <li
      className="relative flex justify-center items-end  w-[280px] h-[380px] rounded-3xl my-[20px] shadow-2xl mt-20 transition-all duration-200 cursor-pointer hover:scale-105"
      onClick={onClickMemberCardHandler}
    >
      <section className="flex flex-col z-1 p-[12px] gap-[5px] items-center pb-5 px-10 ">
        <span className="text-[20px] font-[700] leading-[24px]">
          {user_nickname}
        </span>
        <span className="text-[16px] font-[500] leading-[28px]">
          {position?.name}
        </span>
        <p className="w-full text-[14px] font-[400] leading-[28px] text-center">
          {user_comment ? user_comment : "한줄소개가 없습니다."}
        </p>
        <ul className="flex gap-[5px] mt-3">
          {(user_tech?.length as number) > 0 ? (
            <>
              {user_tech?.map((tech) => (
                <li
                  key={tech.techs.id}
                  className="px-3 py-1 rounded-full border-2 text-[12px] font-[400]"
                >
                  {tech?.techs.tech_name}
                </li>
              ))}
            </>
          ) : (
            <p className="text-gray-300">현재 보유기술이 없습니다.</p>
          )}
        </ul>
      </section>
      <div className="absolute top-[-70px] w-[230px] h-[230px] bg-gray-200 rounded-full shadow-2xl shadow-gray-300">
        <Image
          src={user?.avatar_url || "/images/React.jpeg"}
          alt="user"
          fill
          sizes="auto"
          className="object-cover overflow-hidden w-full h-full transition group-hover:scale-110 rounded-full z-11"
        />
      </div>
    </li>
  )
}

export default MemberCard
