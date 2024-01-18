import Link from "next/link"
import useUserStore from "@/store/user"

const ProfileActions = ({ profileId }: { profileId: string }) => {
  const { user } = useUserStore()

  return (
    <div className="flex float-right">
      {user === profileId && (
        <Link
          href={`/profile/${user}/update`}
          className="inline-block px-4 py-2 border border-blue-500 rounded-full"
        >
          수정하기
        </Link>
      )}
      {user !== profileId && (
        <button className="inline-block px-4 py-2 border border-blue-500 rounded-full">
          내 프로젝트에 초청하기
        </button>
      )}
    </div>
  )
}

export default ProfileActions
