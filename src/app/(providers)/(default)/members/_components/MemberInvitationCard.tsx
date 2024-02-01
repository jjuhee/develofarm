import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import { TProjectsByUserId, TProjectsType } from "@/types/extendedType"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { inviteUser } from "../api"
import useUserStore from "@/store/user"
import { Tables } from "@/types/supabase"

interface Props {
  projects: TProjectsByUserId[]
  receiverId: string
  invitations: Tables<"notifications">[]
}

const MemberInvitationCard = ({ projects, receiverId, invitations }: Props) => {
  const queryClient = useQueryClient()
  const [isActive, setIsActive] = useState(false)
  const dropdownRef = useRef<HTMLInputElement>(null)
  const { user } = useUserStore((state) => state)

  const { mutate: inviteMutate } = useMutation({
    mutationFn: inviteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitations"],
      })
    },
  })

  /** 프로젝트에 초대하기 */
  const onClickInviteUserHandler = (project: TProjectsByUserId) => {
    const newInvitation = {
      project_id: project.id,
      receiver_id: receiverId,
      type: "invitation",
      sender_nickname: user.nickName,
    }

    inviteMutate(newInvitation)
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
          className={`flex flex-col gap-3 absolute h-[200px] overflow-scroll scroll-smooth scrollbar-hide bg-white text-black py-[15px] px-[20px] border-[1px] w-full mt-2 rounded-lg border-black transition-all ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          {(projects?.length as number) > 0 ? (
            <>
              {projects?.map((project: TProjectsByUserId) => (
                <li
                  className="flex items-center justify-between "
                  key={project.id}
                >
                  <p className="text-[15px] font-[500] w-full">
                    {project.title?.length > 11
                      ? project.title.slice(0, 11) + "..."
                      : project.title}
                  </p>
                  <button
                    onClick={() => onClickInviteUserHandler(project)}
                    disabled={isInvited(project.id)}
                    className={`flex items-center justify-center text-[10px] font-[700] w-[50px] h-[23px] rounded-md text-center text-black bg-white border-[1px] border-black cursor-pointer hover:bg-[#CCCCCC] hover:text-black hover:border-black transition-all duration-300
                      disabled:bg-main-lime disabled:cursor-default disabled:border-none
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
