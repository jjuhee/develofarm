"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useProfileStore } from "@/store/profile"
import { useQuery } from "@tanstack/react-query"
import { getProfileBookmarks, getProjects } from "../../api"
import ProfileProjectCard from "../../_components/ProfilePage/projectLists/ProfileProjectCard"
import { Tables } from "@/types/supabase"

const ProfileProjectPage = () => {
  const { id } = useParams<{ id: string }>()
  const setProfileId = useProfileStore((state) => state.setId)

  useEffect(() => {
    setProfileId(id)
  }, [id, setProfileId])

  const {
    data: profileProject,
    isLoading: projectLoading,
    isError: projectError,
  } = useQuery({
    queryKey: ["profileProject", id],
    queryFn: () => getProjects({ userId: id }),
    enabled: !!id,
  })

  const {
    data: bookmarks,
    isLoading: bookmarksLoading,
    isError: bookmarksError,
  } = useQuery({
    queryKey: ["bookmarks", id],
    queryFn: () => getProfileBookmarks({ userId: id }),
    enabled: !!id,
  })

  if (projectLoading || bookmarksLoading) {
    return <div className="hidden">...로딩중</div>
  }
  if (projectError || bookmarksError) {
    return <div>프로젝트 데이터를 불러오는 중 오류가 발생했습니다.</div>
  }

  return (
    <div>
      {!profileProject || profileProject.length === 0 ? (
        <div>
          <h2 className="text-[36px] font-bold pt-5">내가 게시한 프로젝트</h2>
          <div className="pt-[50px]">내가 게시한 프로젝트가 없습니다.</div>
          <hr className="my-[70px] border-t-2 border-gray-300 " />
        </div>
      ) : (
        <>
          <h2 className="text-[36px] font-bold pt-5">내가 게시한 프로젝트</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
            {profileProject.map((project) => (
              <ProfileProjectCard
                key={project.id}
                project={project as Tables<"projects">}
                bookmarks={bookmarks as Tables<"bookmarks">[]}
              />
            ))}
          </div>
          <hr className="my-[70px] border-t-2 border-gray-300 " />
        </>
      )}

      {!bookmarks || bookmarks.length === 0 ? (
        <div>
          <h2 className="text-[36px] font-bold">찜한 프로젝트</h2>
          <div className="pt-[50px]">찜한 프로젝트가 없습니다.</div>
          <hr className="my-[70px] border-t-2 border-gray-300 " />
        </div>
      ) : (
        <>
          <h2 className="text-[36px] font-bold">찜한 프로젝트</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
            {bookmarks?.map((project) => (
              <ProfileProjectCard
                key={project?.id}
                project={project.projects as Tables<"projects">}
                bookmarks={bookmarks as Tables<"bookmarks">[]}
              />
            ))}
          </div>
          <hr className="my-[70px] border-t-2 border-gray-300 " />
        </>
      )}
    </div>
  )
}

export default ProfileProjectPage
