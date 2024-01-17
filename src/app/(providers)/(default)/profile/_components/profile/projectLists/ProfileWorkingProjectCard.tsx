import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getProjectMembers } from "../../../api"
import Link from "next/link"

const ProfileWorkingProjectCard = ({ profileId }: { profileId: string }) => {
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", profileId],
    queryFn: () => getProjectMembers({ userId: profileId }),
    enabled: !!profileId,
  })

  if (isLoading) return <div>Loading...</div>

  if (isError)
    return (
      <div>참여 중인 프로젝트 데이터를 불러오는 중 오류가 발생했습니다.</div>
    )

  if (
    !projects ||
    projects.length === 0 ||
    projects.every((project) => {
      const projectEndDate = project.projects?.project_end_date
        ? new Date(project.projects.project_end_date)
        : null

      return !(projectEndDate && projectEndDate > new Date())
    })
  ) {
    return <div className="pt-[50px]">참여 중인 프로젝트가 없습니다.</div>
  }

  const workingProjects = projects?.filter((project) => {
    const projectEndDate = project.projects?.project_end_date
      ? new Date(project.projects.project_end_date)
      : null

    return projectEndDate && projectEndDate > new Date()
  })

  if (!workingProjects || workingProjects.length === 0)
    return <div className="pt-[50px]">참여 중인 프로젝트가 없습니다.</div>

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
      <div className="border border-gray-300 bg-white rounded-lg shadow-md mt-4 mb-4">
        {workingProjects.map((project) => (
          <div key={project.projects?.id}>
            <div className="flex flex-col items-left">
              <Link href={`/projects/${project.projects?.id}`}>
                <img
                  className="mb-2 w-full h-40 object-cover"
                  src={`${project.projects?.picture_url}`}
                  alt={`Image for ${project.projects?.title}`}
                />
              </Link>
              <Link href={`/projects/${project.projects?.id}`}>
                <div className="flex font-bold ml-5 mt-3 mb-2">
                  <span
                    className={`p-[5px] px-[10px] mr-3 border border-solid rounded-md ${
                      project.projects?.recruit_status
                        ? "bg-[#555555]"
                        : "bg-[#297A5F]"
                    } text-white`}
                  >
                    {project.projects?.recruit_status ? "모집완료" : "모집 중"}
                  </span>
                  <h2 className="text-xl pt-[4px]">
                    {project.projects?.title}
                  </h2>
                </div>
              </Link>
              <div className="flex">
                <p className="text-gray-700 text-sm ml-5 mt-1 mb-3">
                  {project.projects?.content}
                </p>
                {/* 북마크 버튼 */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileWorkingProjectCard
