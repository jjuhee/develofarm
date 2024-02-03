import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getProfileBookmarks, getProjectMembers } from "../../../api"
import ProfileProjectCard from "./ProfileProjectCard"
import { Tables } from "@/types/supabase"

const ProfileProjectList = ({ profileId }: { profileId: string }) => {
  const {
    data: projectMembers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projectMembers", profileId],
    queryFn: () => getProjectMembers({ userId: profileId }),
    enabled: !!profileId,
  })

  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarks", profileId],
    queryFn: () => getProfileBookmarks({ userId: profileId }),
    enabled: !!profileId,
  })

  if (isLoading) {
    return <div className="hidden">...로딩중</div>
  }

  if (isError) {
    return <div>프로젝트 데이터를 불러오는 중 오류가 발생했습니다.</div>
  }

  if (!projectMembers || projectMembers.length === 0) {
    return (
      <div>
        <h2 className="text-[36px] font-bold pt-5">참여중인 프로젝트</h2>
        <div className="pt-[50px]">참여중인 프로젝트가 없습니다.</div>
        <hr className="my-[70px] border-t-2 border-gray-300 " />

        <h2 className="text-[36px] font-bold">참여했던 프로젝트</h2>
        <div className="pt-[50px]">참여했던 프로젝트가 없습니다.</div>
        <hr className="my-[70px] border-t-2 border-gray-300 " />
      </div>
    )
  }

  const expiredProjects = projectMembers.filter(
    (project) =>
      project.projects?.project_end_date &&
      new Date(project.projects.project_end_date) < new Date(),
  )
  const ongoingProjects = projectMembers.filter(
    (project) =>
      !project.projects?.project_end_date ||
      new Date(project.projects.project_end_date) >= new Date(),
  )

  return (
    <div>
      {ongoingProjects.length > 0 ? (
        <>
          <h2 className="text-[36px] font-bold pt-5">참여 중인 프로젝트</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
            {ongoingProjects.map((project) => (
              <ProfileProjectCard
                key={project.projects?.id}
                project={project.projects as Tables<"projects">}
                bookmarks={bookmarks as Tables<"bookmarks">[]}
              />
            ))}
          </div>
          <hr className="my-[70px] border-t-2 border-gray-300 " />
        </>
      ) : (
        <div>
          <h2 className="text-[36px] font-bold pt-5">참여중인 프로젝트</h2>
          <div className="pt-[50px]">참여중인 프로젝트가 없습니다.</div>
          <hr className="my-[70px] border-t-2 border-gray-300 " />
        </div>
      )}

      {expiredProjects.length > 0 ? (
        <>
          <h2 className="text-[36px] font-bold">참여했던 프로젝트</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
            {expiredProjects.map((project) => (
              <ProfileProjectCard
                key={project.projects?.id}
                project={project.projects as Tables<"projects">}
                bookmarks={bookmarks as Tables<"bookmarks">[]}
              />
            ))}
          </div>
          <hr className="my-[70px] border-t-2 border-gray-300 " />
        </>
      ) : (
        <div>
          <h2 className="text-[36px] font-bold">참여했던 프로젝트</h2>
          <div className="pt-[50px]">참여했던 프로젝트가 없습니다.</div>
          <hr className="my-[70px] border-t-2 border-gray-300 " />
        </div>
      )}
    </div>
  )
}

export default ProfileProjectList
