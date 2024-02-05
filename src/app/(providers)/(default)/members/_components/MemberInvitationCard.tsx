import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import { TProjectsByUserId, TUsersType } from "@/types/extendedType"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import useUserStore from "@/store/user"
import useAddNotiMutate from "@/hooks/useAddNotiMutate"

import type { Tables } from "@/types/supabase"
import { useCustomModal } from "@/hooks/useCustomModal"

interface Props {
  projects: TProjectsByUserId[]
  selectedMember: TUsersType
  invitations: Tables<"notifications">[]
}

const MemberInvitationCard = ({
  projects,
  selectedMember,
  invitations,
}: Props) => {
  const [isActive, setIsActive] = useState(false)
  const dropdownRef = useRef<HTMLInputElement>(null)
  const { user } = useUserStore((state) => state)
  const addNotiMutate = useAddNotiMutate()
  const { openCustomModalHandler } = useCustomModal()

  /** 프로젝트에 초대하기 */
  const onClickInviteUserHandler = (project: TProjectsByUserId) => {
    const newInvitation = {
      project_id: project.id,
      receiver_id: selectedMember.id,
      type: "invitation",
      sender_nickname: user?.nickName as string,
    }

    addNotiMutate(newInvitation)

    openCustomModalHandler(
      `<${project.title}>에 ${selectedMember.user_nickname}님을 초대했습니다.`,
      "alert",
    )
  }

  /** 이미 초대한 프로젝트 색깔 변경 및 disable 처리 */
  const isInvited = (projectId: string) => {
    if (invitations) {
      return invitations.some(
        (invitation) => invitation.project_id === projectId,
      )
    }
  }

  useOnClickOutSide({ ref: dropdownRef, handler: () => setIsActive(false) })

  return (
    <div className="flex h-full mb-8" ref={dropdownRef}>
      <div className="relative">
        {user?.id !== selectedMember?.id && (
          <button
            className=" flex items-center justify-between w-[208px] bg-main-lime py-2 pl-6 pr-4 rounded-lg text-black font-[600] cursor-pointer"
            onClick={() => setIsActive(!isActive)}
          >
            내 프로젝트에 초대하기
            <span>
              {isActive ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )}
            </span>
          </button>
        )}

        <ul
          className={`flex flex-col absolute h-[215px] overflow-scroll scroll-smooth scrollbar-hide bg-white text-black py-1 border-[0.5px] w-full mt-2 rounded-lg border-black transition-all ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          {projects && projects?.length > 0 ? (
            <>
              {projects?.map((project: TProjectsByUserId) => (
                <li
                  className="flex items-center leading-[18px] py-[10px] px-3 justify-between "
                  key={project.id}
                >
                  <p className="w-[70%] truncate">{project.title}</p>
                  <button
                    onClick={() => onClickInviteUserHandler(project)}
                    disabled={isInvited(project.id)}
                    className={`flex items-center justify-center text-[12px] font-[600] w-[34px] h-[22px]  rounded-md text-center text-black bg-main-lime cursor-pointer ${
                      !isInvited(project.id) &&
                      "hover:bg-[#CCCCCC] hover:text-black hover:border-black"
                    }  transition-all duration-300
                      disabled:text-[#A6A6A6] disabled:cursor-not-allowed disabled:border-[0.8px] disabled:border-[#A6A6A6] disabled:bg-white
                    `}
                  >
                    초대
                  </button>
                </li>
              ))}
            </>
          ) : (
            <>
              <p className="text-[15px] font-[500]">
                현재 초청할 수 있는 프로젝트가 없습니다.
              </p>
              <Link
                href={"/write"}
                className="text-[11px] font-[700] px-3 py-1 rounded-2xl text-center text-white bg-black cursor-pointer"
              >
                새 프로젝트 올리기 {"->"}
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default MemberInvitationCard
