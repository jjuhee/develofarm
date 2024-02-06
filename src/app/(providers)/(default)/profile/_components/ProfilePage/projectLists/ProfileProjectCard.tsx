import React from "react"
import Link from "next/link"
import BookmarkButton from "@/components/BookmarkButton"
import { Tables } from "@/types/supabase"

const ProfileProjectCard = ({
  project,
  bookmarks,
}: {
  project: Tables<"projects">
  bookmarks: Tables<"bookmarks">[]
}) => {
  return (
    <div className="border border-gray-300 h-[356px] w-[371px] bg-white rounded-[20px] shadow-md mt-4 mb-4 transition-transform transform hover:scale-105">
      <div className="flex flex-col items-left">
        <Link href={`/projects/${project.id}`}>
          <img
            className="h-[222.98px] w-full object-cover rounded-t-[20px]"
            src={`${project.picture_url}`}
            alt={`Image for ${project.title}`}
          />
        </Link>
        <div className="p-[20px]">
          <div className="flex font-bold">
            <div>
              <p
                className={`p-[5px] px-[10px] mr-3 border border-solid border-[#666666] rounded-full ${
                  project.recruit_status
                    ? "bg-[#666666] text-white"
                    : "bg-[#ffffff] font-bold"
                } text-[15px]`}
              >
                {project.recruit_status ? "모집 완료" : "모집 중"}
              </p>
            </div>
            <div>
              <h2 className="text-[20px]">
                {project.title && project.title.length > 10
                  ? `${project.title.slice(0, 10)}...`
                  : project.title}
              </h2>
            </div>
          </div>
          <div className="pt-[20px] text-[14px] line-clamp-2">
            <p
              dangerouslySetInnerHTML={{ __html: project.content as string }}
            />
            <div className="absolute top-[245px] right-2">
              <BookmarkButton projectId={project.id} bookmarks={bookmarks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileProjectCard
