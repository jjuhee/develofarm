import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import formatDate from "@/utils/formatDate"
import BookmarkButton from "@/components/BookmarkButton"
import type { Tables } from "@/types/supabase"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import parse from "html-react-parser"
import { getProjectTech } from "../api"

interface Props {
  project: Tables<"projects">
  bookmarks: Tables<"bookmarks">[]
  currentUser: string
  techs: Tables<"techs">[]
  setProjectId: Dispatch<SetStateAction<string>>
}

const ProjectCard = ({
  project,
  bookmarks,
  currentUser,
  techs,
  setProjectId,
}: Props) => {
  const {
    id,
    content,
    created_at,
    picture_url,
    project_start_date,
    project_end_date,
    title,
    user_id,
    recruit_status,
  } = project

  useEffect(() => {
    setProjectId(id)
  }, [id, setProjectId])

  const { data: projectTechs } = useQuery({
    queryKey: ["techs", id],
    queryFn: () => getProjectTech(id),
    enabled: !!id,
  })

  const parsedContent = parse(content) as string

  const cardContent =
    content?.length > 100 ? parsedContent.slice(0, 100) + "..." : parsedContent

  return (
    <div className="flex">
      <section className="relative overflow-hidden rounded-xl w-full md:max-w-[498px] md:h-[270px] max-w-[300px] h-[230px] transition-all bg-slate-200 mr-20">
        <Image
          src={picture_url || "/images/project_default.png"}
          alt="project"
          fill
          sizes="auto"
          className="object-cover w-full h-full transition group-hover:scale-110 "
        />
      </section>
      <section className="relative flex flex-col pt-5  w-full justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <span className="bg-gray-300 px-2 py-1 rounded-md text-[20px] font-[700] text-white">
              {recruit_status ? "모집 완료" : "모집 중"}{" "}
            </span>
            <h3 className="text-[26px] font-[700]">{title}</h3>
          </div>
          <span className="hidden md:block">
            {formatDate(project_start_date)} - {formatDate(project_end_date)}
          </span>
          <p>{cardContent}</p>
        </div>
        <div className="flex justify-between items-center">
          <ul className="flex gap-3 ">
            {projectTechs?.map((tech, i) => (
              <li
                key={i}
                className="flex justify-center items-center border-2 px-3 py-1 rounded-3xl"
              >
                {tech}
              </li>
            ))}
          </ul>
          <Link
            href={`projects/${id}`}
            className="absolute bottom-0 right-2 bg-black text-white text-[16px] py-[12px] px-[34px] rounded-3xl"
          >
            지원하기
          </Link>
        </div>

        <div className="absolute top-4 right-2">
          <BookmarkButton
            projectId={id}
            currentUser={currentUser}
            bookmarks={bookmarks}
          />
        </div>
      </section>
    </div>
  )
}

export default ProjectCard
