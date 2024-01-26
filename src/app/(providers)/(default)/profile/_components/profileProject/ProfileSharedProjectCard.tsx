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
    return <div>게시한 프로젝트 데이터를 불러오는 중 오류가 발생했습니다.</div>
  }

  if (!projects || projects.length === 0) {
    return <div className="pt-[50px]">게시한 프로젝트글이 없습니다.</div>
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5">
      {projects?.map((project) => (
        <div
          key={project.id}
          className="border border-gray-300 h-[356px] w-[371px] bg-white rounded-[20px]  shadow-md mt-4 mb-4 transition-transform transform hover:scale-105"
        >
          <div className="flex flex-col items-left">
            <Link href={`/projects/${project.id}`}>
              <img
                className="h-[222.98px] w-full bg-[#3498db] object-cover rounded-t-[20px]"
                src={`${project.picture_url}`}
                alt={`Image for ${project.title}`}
              />
            </Link>
            <div className="p-[20px]">
              <Link href={`/projects/${project.id}`}>
                <div className="flex font-bold">
                  <div>
                    <p
                      className={`p-[5px] px-[10px] mr-3 border border-solid border-[#666666] rounded-full ${
                        project.recruit_status
                          ? "bg-[#666666] text-white"
                          : "bg-[#ffffff] text-bold"
                      } text-[15px]`}
                    >
                      {project.recruit_status ? "모집 완료" : "모집 중"}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-[20px]">
                      {project.title && project.title.length > 10
                        ? project.title.slice(0, 10) + "..."
                        : project.title}
                    </h2>
                  </div>
                </div>
              </Link>

              <div className="pt-[20px] text-[14px] line-clamp-2">
                <p
                  dangerouslySetInnerHTML={{
                    __html: project.content as string,
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

export default ProfileSharedProjectCard
