import Link from "next/link"
import useUserStore from "@/store/user"
import MemberInvitationCard from "../../../members/_components/MemberInvitationCard"
import { useQuery } from "@tanstack/react-query"
import { getProjectByUserId } from "../../../members/api"
import useMembersStore from "@/store/members"
import { TProjectsByUserId } from "@/types/extendedType"

const ProfileActions = ({ profileId }: { profileId: string }) => {
  const selectedMember = useMembersStore((state) => state.selectedMember)
  const { userId } = useUserStore()

  const { data: projects } = useQuery({
    queryKey: ["projects", userId],
    queryFn: () => getProjectByUserId(userId),
    enabled: !!userId,
  })

  return (
    <div className="flex float-right pt-[31px]">
      {userId === profileId && (
        <Link
          href={`/profile/${userId}/update`}
          className="bottom-0 right-2 border-2 bg-[#B8FF65] text-[#000000] text-[16px] font-[700] py-2 px-6 rounded-[8px] hover:bg-[#666666] hover:text-[#B8FF65] transition-all duration-300"
        >
          수정하기
        </Link>
      )}
      {userId !== profileId && (
        <button>
          <MemberInvitationCard
            projects={projects as TProjectsByUserId[]}
            receiverId={selectedMember.id}
          />
        </button>
      )}
    </div>
  )
}

export default ProfileActions
