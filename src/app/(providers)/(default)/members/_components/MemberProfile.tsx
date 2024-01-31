import useMembersStore from "@/store/members"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { getProjectByUserId } from "../api"
import { useRouter } from "next/navigation"
import MemberInvitationCard from "./MemberInvitationCard"
import { TProjectsByUserId, TProjectsType } from "@/types/extendedType"

interface Props {
  currentUserId: string
}

const MemberProfile = ({ currentUserId }: Props) => {
  const selectedMember = useMembersStore((state) => state.selectedMember)
  const router = useRouter()

  const { data: projects } = useQuery({
    queryKey: ["projects", currentUserId],
    queryFn: () => getProjectByUserId(currentUserId),
    enabled: !!currentUserId,
  })

  const onClickToProfilePageHandler = () => {
    router.push(`/profile/${selectedMember?.id}`)
    window.scroll({
      top: 0,
    })
  }

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex  items-center">
          <div className="w-[123px] h-[123px] bg-gray-300 overflow-hidden rounded-full mr-10">
            <Image
              src={
                (selectedMember.avatar_url as string) || "/images/React.jpeg"
              }
              alt="member"
              width={140}
              height={140}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[30px] font-[700]">
              {" "}
              j{selectedMember.user_nickname}
            </h3>
            <p className="text-[20px] font-[600]">
              {selectedMember.position?.name || "포지션을 정해주세요."}
            </p>
          </div>
        </div>
        <MemberInvitationCard
          projects={projects as TProjectsByUserId[]}
          receiverId={selectedMember.id}
        />
      </div>
      <div className="flex flex-col w-full gap-3">
        <h3 className="text-[18px] font-[700]">보유 기술</h3>
        <ul className="flex gap-5 items-center border-b-[0.7px] border-black pb-[30px]">
          {(selectedMember?.user_tech?.length as number) > 0 ? (
            <>
              {selectedMember?.user_tech?.slice(0, 6).map((tech) => (
                <li
                  key={tech.techs?.id}
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
      <div className="flex flex-col w-full gap-3">
        <h3 className="text-[18px] font-[700]">소개글</h3>
        <p className="text-[14px] font-[300] border-b-[0.7px] border-black pb-[30px]">
          {selectedMember.user_comment
            ? selectedMember.user_comment
            : "현재 소개글이 없습니다."}
        </p>
      </div>
      <div className="flex flex-col w-full gap-3">
        <h3 className="text-[18px] font-[700]">포트폴리오</h3>
        <p className="text-[14px] font-[300]">업데이트 예정입니다.</p>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col w-full gap-3">
          <h3 className="text-[18px] font-[700]">Blog</h3>
          <a
            href={selectedMember?.social_links?.[0]?.blog_url as string}
            className="text-[14px] font-[400]"
          >
            {selectedMember.social_links?.[0]?.blog_url ||
              "Blog link가 없습니다."}
          </a>
        </div>
        <div className="flex flex-col w-full gap-3">
          <h3 className="text-[18px] font-[700]">GitHub</h3>
          <a
            href={selectedMember.social_links?.[0]?.github_url as string}
            className="text-[14px] font-[400]"
          >
            {selectedMember.social_links?.[0]?.github_url ||
              "GitHub link가 없습니다."}
          </a>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button
          className="border-2 border-[#A6A6A6] text-[15px] font-[500] py-2 px-4 mt-4 rounded-lg cursor-pointer hover:bg-[#EEEEEE] hover:text-[#2D2D2D] hover:border-[#2D2D2D] transition-all duration-300 active:bg-[#D2D2D2] active:border-[#D2D2D2]"
          onClick={onClickToProfilePageHandler}
        >
          자세히 보기
        </button>
      </div>
    </>
  )
}

export default MemberProfile
