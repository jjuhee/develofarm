import useMembersStore from "@/store/members"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { getInvitationByReceiverId, getProjectByUserId } from "../api"
import MemberInvitationCard from "./MemberInvitationCard"
import useUserStore from "@/store/user"
import Link from "next/link"

import type { TProjectsByUserId } from "@/types/extendedType"
import type { Tables } from "@/types/supabase"

/** 멤버 프로필 모달 */
const MemberProfileModal = () => {
  const selectedMember = useMembersStore((state) => state.selectedMember)
  const currentUserId = useUserStore((state) => state.user?.id as string)

  /** 현재 유저의 프로젝트 리스트 가져오기 */
  const { data: projects } = useQuery<unknown, Error, TProjectsByUserId[]>({
    queryKey: ["projects", currentUserId],
    queryFn: () => getProjectByUserId(currentUserId),
    enabled: !!currentUserId,
  })

  /** receiverId가 선택 멤버이고 type이 invitation인 notifications 데이터 가져오기 */
  const { data: invitationByReceiverId } = useQuery<
    unknown,
    Error,
    Tables<"notifications">[]
  >({
    queryKey: ["invitations", selectedMember.id],
    queryFn: () => getInvitationByReceiverId(selectedMember.id),
    enabled: !!selectedMember.id,
  })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex  items-center">
          <Image
            src={selectedMember.avatar_url! || "/images/default_avatar.png"}
            alt="member"
            width={123}
            height={123}
            className="w-[123px] h-[123px] object-cover rounded-full mr-10"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-[21px] font-[800]">
              {selectedMember.user_nickname}
            </h3>
            <h3>{selectedMember.position?.name || "포지션이 없습니다"}</h3>
          </div>
        </div>
        {/* 멤버를 초대할 프로젝트 리스트 카드 */}
        <MemberInvitationCard
          projects={projects!}
          selectedMember={selectedMember}
          invitations={invitationByReceiverId!}
        />
      </div>
      <div className="flex flex-col w-full gap-3">
        <h3>보유 기술</h3>
        <ul className="flex gap-5 items-center border-b-[0.7px] border-black pb-[30px]">
          {selectedMember.user_tech && selectedMember.user_tech.length > 0 ? (
            <>
              {selectedMember.user_tech?.slice(0, 6).map((tech) => (
                <li
                  key={tech.techs?.id}
                  className="text-[12px] text-[#636366] font-[400] bg-[#E6E6E6] h-[24px] px-4 border-gray-70 border-2 rounded-3xl"
                >
                  {tech.techs?.tech_name}
                </li>
              ))}
            </>
          ) : (
            <p className="text-gray-500">현재 보유기술이 없습니다.</p>
          )}
        </ul>
      </div>
      <div className="flex flex-col w-full gap-3">
        <h3>소개글</h3>
        <p className="border-b-[0.7px] text-[#2d2d2d] border-black pb-[30px]">
          {selectedMember.user_comment
            ? selectedMember.user_comment
            : "현재 소개글이 없습니다."}
        </p>
      </div>
      <div className="flex flex-col w-full gap-3">
        <h3>포트폴리오</h3>
        <p>업데이트 예정입니다.</p>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col w-full gap-3">
          <h3>Blog</h3>
          <a
            href={selectedMember?.social_links?.[0]?.blog_url!}
            className={`text-[12px] font-[400] ${
              !selectedMember.social_links?.[0]?.blog_url &&
              "cursor-not-allowed"
            } `}
          >
            {selectedMember.social_links?.[0]?.blog_url ||
              "Blog link가 없습니다."}
          </a>
        </div>
        <div className="flex flex-col w-full gap-3">
          <h3>GitHub</h3>
          <a
            href={selectedMember.social_links?.[0]?.github_url!}
            className={`text-[12px] font-[400] 
            ${
              !selectedMember.social_links?.[0]?.github_url &&
              "cursor-not-allowed"
            }`}
          >
            {selectedMember.social_links?.[0]?.github_url ||
              "GitHub link가 없습니다."}
          </a>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Link
          href={`/profile/${selectedMember.id}`}
          className=" border-[1.5px] border-[#A6A6A6] text-[14px] font-[600] py-2 px-4 mt-4 rounded-lg cursor-pointer hover:bg-[#EEEEEE] hover:text-[#2D2D2D] hover:border-[#2D2D2D] transition-all duration-300 active:bg-[#D2D2D2] active:border-[#D2D2D2]"
        >
          자세히 보기
        </Link>
      </div>
    </>
  )
}

export default MemberProfileModal
