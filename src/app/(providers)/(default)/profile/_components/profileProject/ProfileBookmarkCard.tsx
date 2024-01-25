import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getProfileBookmarks } from "../../api"
import Link from "next/link"

const ProfileBookmarkCard = ({ profileId }: { profileId: string }) => {
  const {
    data: bookmarks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookmarks", profileId],
    queryFn: () => getProfileBookmarks({ userId: profileId }),
    enabled: !!profileId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>찜한 프로젝트 데이터를 불러오는 중 오류가 발생했습니다.</div>
  }

  if (!bookmarks || bookmarks.length === 0) {
    return <div className="pt-[50px]">찜한 프로젝트가 없습니다.</div>
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
      {bookmarks?.map((bookmark) => (
        <div
          key={bookmark.id}
          className="border border-gray-300 h-[356px] w-[371px] bg-white rounded-[20px]  shadow-md mt-4 mb-4 transition-transform transform hover:scale-105"
        >
          <div className="flex flex-col items-left">
            <Link href={`/projects/${bookmark.id}`}>
              <img
                className="h-[222.98px] w-full bg-[#3498db] object-cover rounded-t-[20px]"
                src={`${bookmark.projects?.picture_url}`}
                alt={`Image for ${bookmark.projects?.title}`}
              />
            </Link>
            <div className="p-[20px]">
              <Link href={`/projects/${bookmark.projects?.id}`}>
                <div className="flex font-bold">
                  <div>
                    <p
                      className={`p-[5px] px-[10px] mr-3 border border-solid rounded-[5px] ${
                        bookmark.projects?.recruit_status
                          ? "bg-[#666666]"
                          : "bg-[#297A5F]"
                      } text-white text-[14px]`}
                    >
                      {bookmark.projects?.recruit_status
                        ? "모집완료"
                        : "모집 중"}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-[20px]">
                      {bookmark.projects?.title &&
                      bookmark.projects?.title.length > 15
                        ? bookmark.projects?.title.slice(0, 15) + "..."
                        : bookmark.projects?.title}
                    </h2>
                  </div>
                </div>
              </Link>
              <div className="pt-[20px] text-[14px] line-clamp-2">
                <p
                  dangerouslySetInnerHTML={{
                    __html: bookmark.projects?.content as string,
                  }}
                />
                {/* 북마크 버튼 */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default ProfileBookmarkCard
