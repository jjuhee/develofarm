import Image from "next/image"
import React from "react"
import useMembersStore from "@/store/members"
import { TUsersType } from "@/types/extendedType"
import useUserStore from "@/store/user"
import useLoginConfirmModal from "@/hooks/useLoginConfirmModal"

interface Props {
  user: TUsersType
}

const MemberCard = ({ user }: Props) => {
  const currentUserId = useUserStore((state) => state.user?.id)
  const openLoginConfirmModal = useLoginConfirmModal()
  const { setViewMemberModal, setSelectedMember } = useMembersStore(
    (state) => state,
  )

  const { user_nickname, position, user_comment, user_tech } = user

  /** 멤버 카드 클릭 핸들러 */
  const onClickMemberCardHandler = () => {
    if (!currentUserId) {
      openLoginConfirmModal()
    } else {
      setSelectedMember(user)
      setViewMemberModal(true)
    }
  }

  return (
    <li
      className="flex flex-col justify-start w-[165px] h-auto sm:w-[280px] sm:h-[500px] rounded-3xl transition-all duration-200 cursor-pointer hover:scale-105"
      onClick={onClickMemberCardHandler}
    >
      <div className="mb-4 w-[165px] h-[165px] overflow-hidden sm:w-[280px] sm:h-[280px]">
        <Image src={user.avatar_url!} alt="user" width={280} height={280} />
      </div>
      <section className="flex flex-col z-1 p-[12px] gap-[7px] pb-5 ">
        <h3 className="text-[20px] font-[700] leading-[24px]">
          {user_nickname}
        </h3>
        <span className="text-[14px] font-[400] text-[#80E500]  leading-[28px]">
          {position?.name}
        </span>
        <p className="w-full h-[36px] text-[#2D2D2D] leading-[18px] mt-2 line-clamp-2">
          {user_comment ? user_comment : "한줄소개가 없습니다."}
        </p>
        <ul className="flex flex-wrap gap-[5px] mt-3">
          {user_tech && user_tech.length > 0 && (
            <>
              {user_tech.slice(0, 3).map((tech) => (
                <li
                  key={tech.techs?.id}
                  className="px-3 py-1 rounded-full bg-[#E6E6E6] text-[#2D2D2D] text-[13px] font-[400]"
                >
                  {tech.techs?.tech_name}
                </li>
              ))}
            </>
          )}
        </ul>
      </section>
    </li>
  )
}

export default MemberCard
