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
    <div
      className="flex cursor-pointer border-b border-[#D2D2D2] py-[40px] last:border-none first:pt-0 "
      onClick={onClickToDetailPage}
    >
      <section className="relative overflow-hidden rounded-xl min-w-[115px] h-[80px] transition-all bg-slate-200 mr-10 md:min-w-[416px] md:h-[251px] ">
        <Image
          src={picture_url!}
          alt="project"
          fill
          sizes="auto"
          className="object-cover"
        />
      </section>
      <section className="relative flex flex-col w-full lg:w-[60%] py-2 justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 items-start md:flex-row md:items-center">
            <h4
              className={`${
                recruit_status
                  ? "bg-[#666666] border-[#666666] text-white"
                  : "bg-white  border-black text-black"
              } flex items-center justify-center min-w-[60px] h-[25px] border rounded-2xl `}
            >
              {recruit_status ? "모집 완료" : "모집 중"}{" "}
            </h4>
            <h2 className="mr-10 w-full text-[15px] truncate md:w-[600px] md:text-[18px]">
              {title}
            </h2>
          </div>
          <span className="flex items-center gap-2 text-base font-medium text-[#666666]">
            <Image
              src={"/icons/calendar.png"}
              alt="calendar"
              width={13}
              height={13}
            />
            {formatDate(project_start_date)} - {formatDate(project_end_date)}
          </span>
          <p
            className="line-clamp-5  leading-[18px] pt-2 text-[#363940] hidden md:block"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(content, {
                allowedTags: [],
              }),
            }}
          ></p>
        </div>
        <div className="justify-between items-center mt-10 hidden md:block">
          <ul className="flex gap-3 relative">
            <ProjectCardTechs project={project} />
          </ul>
        </div>

        <div className="absolute top-[12px] right-2">
          <BookmarkButton projectId={id} bookmarks={bookmarks} />
        </div>
      </section>
    </div>
  )
}

export default ProjectCard
