import Link from "next/link"
import { useProfileStore } from "@/store/profile"

const ProfileActions = ({ profileId }: { profileId: string }) => {
  const { profile } = useProfileStore()

  return (
    <div className="flex float-right">
      {profile?.id === profileId && (
        <Link
          href={`/profile/${profile?.id}/update`}
          className="inline-block px-4 py-2 border border-blue-500 rounded-full"
        >
          수정하기
        </Link>
      )}
      {profile?.id !== profileId && (
        <button className="inline-block px-4 py-2 border border-blue-500 rounded-full">
          내 프로젝트에 초청하기
        </button>
      )}
    </div>
  )
}

export default ProfileActions
