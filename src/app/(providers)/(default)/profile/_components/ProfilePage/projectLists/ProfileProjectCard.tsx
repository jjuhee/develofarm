import React from "react"
import Link from "next/link"
import BookmarkButton from "@/components/BookmarkButton"
import { Tables } from "@/types/supabase"
import Image from "next/image"

const ProfileProjectCard = ({
  project,
  bookmarks,
}: {
  project: Tables<"projects">
  bookmarks: Tables<"bookmarks">[]
}) => {
  return (
    <div className="border border-gray-300 w-[371px] h-[356px] bg-white rounded-[20px] shadow-md mt-4 mb-4 transition-transform transform hover:scale-105">
      <div className="flex flex-col items-left">
        <Link href={`/projects/${project.id}`}>
          <Image
            className="object-cover rounded-t-[20px]"
            src={project.picture_url as string}
            alt={`Image for ${project.title}`}
            width={370}
            height={222.98}
          />
        </Link>
        <div className="p-[20px]">
          <div className="flex font-bold">
            <div>
              <p
                className={`text-[14px] py-[2px] px-[10px] mr-3 border border-solid border-[#666666] rounded-full ${
                  project.recruit_status
                    ? "bg-[#666666] text-white"
                    : "bg-[#ffffff] font-bold"
                } text-[15px]`}
              >
                {project.recruit_status ? "모집 완료" : "모집 중"}
              </p>
            </div>
            <div>
              <h2 className="text-[16px]">
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
