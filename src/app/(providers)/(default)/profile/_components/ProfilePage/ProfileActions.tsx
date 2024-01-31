import Link from "next/link"
import useUserStore from "@/store/user"

const ProfileActions = ({ profileId }: { profileId: string }) => {
  const { userId } = useUserStore()

  return (
    <div className="flex float-right">
      {userId === profileId && (
        <Link
          href={`/profile/${userId}/update`}
          className="bottom-0 right-2 border-2 bg-[#B8FF65] text-[#000000] text-[16px] font-[700] py-2 px-6 rounded-[8px] hover:bg-[#666666] hover:text-[#B8FF65] transition-all duration-300"
        >
          수정하기
        </Link>
      )}
      {userId !== profileId && (
        <button className="bottom-0 right-2 border-2 bg-[#B8FF65] text-[#000000] text-[16px] font-[700] py-2 px-6 rounded-[8px] hover:bg-[#666666] hover:text-[#B8FF65] transition-all duration-300">
          내 프로젝트에 초청하기
        </button>
      )}
    </div>
  )
}

export default ProfileActions
