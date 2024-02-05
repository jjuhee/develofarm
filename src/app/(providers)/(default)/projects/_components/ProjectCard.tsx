import Image from "next/image"
import formatDate from "@/utils/formatDate"
import BookmarkButton from "@/components/BookmarkButton"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProjectViews } from "../[id]/api"
import { useRouter } from "next/navigation"
import ProjectCardTechs from "./ProjectCardTechs"
import sanitizeHtml from "sanitize-html"

import type { Tables } from "@/types/supabase"
import type { TProjectsType } from "@/types/extendedType"

interface Props {
  project: TProjectsType
  bookmarks: Tables<"bookmarks">[]
}

const ProjectCard = ({ project, bookmarks }: Props) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    id,
    content,
    picture_url,
    project_start_date,
    project_end_date,
    title,
    recruit_status,
    views,
  } = project

  const { mutate: viewsMutate } = useMutation({
    mutationFn: updateProjectViews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["views"] })
    },
  })

  /** 조회수 업데이트 및 이동 핸들러*/
  const onClickToDetailPage = () => {
    const countViews = views + 1
    viewsMutate({ projectId: project.id, countViews })
    router.push(`/projects/${id}`)
  }

  return (
    <li
      className="flex w-full cursor-pointer border-b border-[#D2D2D2] py-[40px] last:border-none first:pt-0 "
      onClick={onClickToDetailPage}
    >
      {/* 프로젝트 이미지 */}
      <section className="relative rounded-xl min-w-[115px] h-[80px] transition-all overflow-hidden mr-10 lg:min-w-[431px] lg:min-h-[251px] ">
        <Image
          src={picture_url!}
          alt="project"
          fill
          sizes="auto"
          className="object-cover"
        />
      </section>

      {/* 프로젝트 내용 */}
      <section className="relative flex flex-col justify-between w-full py-0 lg:py-2">
        <div className="flex flex-col max-w-full gap-3 lg:gap-5">
          <div className="flex flex-col gap-1 lg:gap-3 items-start lg:flex-row lg:items-center">
            <h4
              className={`${
                recruit_status
                  ? "bg-[#666666] border-[#666666] text-white"
                  : "bg-white  border-black text-black"
              } flex items-center justify-center min-w-[50px] h-[18px] text-[10px] lg:text-[12px] lg:min-w-[63px] lg:h-[25px] border rounded-2xl `}
            >
              {recruit_status ? "모집 완료" : "모집 중"}{" "}
            </h4>
            <h2 className="mr-10 text-[15px] w-[200px] truncate lg:w-full lg:text-[18px] lg:mr-10">
              {title}
            </h2>
          </div>
          <span className="flex items-center gap-2 text-xs lg:text-base font-medium text-[#666666]">
            <Image
              src={"/icons/calendar.png"}
              alt="calendar"
              width={13}
              height={13}
            />
            {formatDate(project_start_date)} - {formatDate(project_end_date)}
          </span>
          <div className="hidden lg:block">
            <p
              className="line-clamp-4"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(content, {
                  allowedTags: [],
                }),
              }}
            ></p>
          </div>
        </div>

        <div className="justify-between items-center mt-10 hidden lg:block">
          <ul className="flex gap-3 relative">
            <ProjectCardTechs project={project} />
          </ul>
        </div>

        <div className="absolute top-5 right-2 lg:top-[12px]">
          <BookmarkButton projectId={id} bookmarks={bookmarks} />
        </div>
      </section>
    </li>
  )
}

export default ProjectCard
