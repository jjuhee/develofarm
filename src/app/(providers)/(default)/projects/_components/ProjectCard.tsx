import Image from "next/image"
import formatDate from "@/utils/formatDate"
import BookmarkButton from "@/components/BookmarkButton"
import Button from "@/components/ui/Button"

import type { Tables } from "@/types/supabase"
import type { TProjectsType } from "@/types/extendedType"
import Link from "next/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProjectViews } from "../[id]/api"

interface Props {
  project: TProjectsType
  bookmarks: Tables<"bookmarks">[]
  currentUser: string
  page?: number
}

const ProjectCard = ({ project, bookmarks, currentUser, page }: Props) => {
  const queryClient = useQueryClient()

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
    project_tech,
    views,
  } = project

  const { mutate: viewsMutate } = useMutation({
    mutationFn: updateProjectViews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["views"] })
    },
  })

  /** 조회수 업데이트 */
  const onClickToDetailPage = () => {
    const countViews = views + 1
    viewsMutate({ projectId: project.id, countViews })
  }

  return (
    <div className="flex">
      <section className="relative overflow-hidden rounded-xl w-full h-[270px] transition-all bg-slate-200 mr-10 hidden lg:block">
        <Image
          src={picture_url || "/images/project_default.png"}
          alt="project"
          fill
          sizes="auto"
          className="object-cover w-full h-full"
        />
      </section>
      <section className="relative flex flex-col w-full lg:w-[60%] py-2 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <span
              className={`${
                recruit_status
                  ? "bg-[#666666] border-[#666666] text-white"
                  : "bg-white  border-black text-black"
              } min-w-[90px] py-1 border-2 text-center rounded-2xl text-[16px] font-[700] `}
            >
              {recruit_status ? "모집 완료" : "모집 중"}{" "}
            </span>
            <h3 className="text-[26px] font-[700] mr-10 w-full lg:w-[600px] truncate">
              {title}
            </h3>
          </div>
          <span className="hidden md:block">
            {formatDate(project_start_date)} - {formatDate(project_end_date)}
          </span>
          <p
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
        </div>
        <div className="flex justify-between items-center">
          <ul className="flex gap-3 ">
            {project_tech?.map((tech, i) => (
              <li
                key={i}
                className="flex justify-center items-center bg-[#E6E6E6] text-[#636366] px-3 py-1 rounded-3xl"
              >
                {tech?.techs?.tech_name}
              </li>
            ))}
          </ul>
          <Link
            href={`/projects/${project.id}`}
            className="absolute bottom-0 right-2"
          >
            <Button
              color={"main-lime"}
              text="상세보기"
              handler={onClickToDetailPage}
            />
          </Link>
        </div>

        <div className="absolute top-[12px] right-2">
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
