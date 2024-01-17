import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "../../api"
import Link from "next/link"

const ProfileSharedProjectCard = ({ profileId }: { profileId: string }) => {
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", profileId],
    queryFn: () => getProjects({ userId: profileId }),
    enabled: !!profileId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div>참여 했던 프로젝트 데이터를 불러오는 중 오류가 발생했습니다.</div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
      {projects?.map((project) => (
        <div key={project.id} className="mb-4">
          <div className="border border-gray-300 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-left">
              <Link href={`/projects/${project.id}`}>
                <img
                  className="mb-2 w-full h-40 object-cover"
                  src={`${project.picture_url}`}
                  alt={`Image for ${project.title}`}
                />
              </Link>
              <Link href={`/projects/${project.id}`}>
                <div className="flex font-bold ml-5 mt-3 mb-2">
                  <span
                    className={`p-[5px] px-[10px] mr-3 border border-solid rounded-md ${
                      project.recruit_status ? "bg-[#555555]" : "bg-[#297A5F]"
                    } text-white`}
                  >
                    {project.recruit_status ? "모집완료" : "모집 중"}
                  </span>
                  <h2 className="text-xl pt-[4px]">{project.title}</h2>
                </div>
              </Link>
              <div className="flex">
                <p className="text-gray-700 text-sm ml-5 mt-1 mb-3">
                  {project.content}
                </p>
                {/* 북마크 버튼 */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProfileSharedProjectCard
