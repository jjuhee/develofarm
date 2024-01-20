import Image from "next/image"
import formatDate from "@/utils/formatDate"
import BookmarkButton from "@/components/BookmarkButton"
import { useCustomModal } from "@/hooks/useCustomModal"
import { useRouter } from "next/navigation"

import type { Tables } from "@/types/supabase"
import { ExtendedProjectsType } from "@/types/extendedType"
import Button from "@/components/ui/Button"

interface Props {
  project: ExtendedProjectsType
  bookmarks: Tables<"bookmarks">[]
  currentUser: string
}

const ProjectCard = ({ project, bookmarks, currentUser }: Props) => {
  const { openCustomModalHandler } = useCustomModal()

  const router = useRouter()

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
  } = project

  const cardContent =
    content?.length > 100 ? content.slice(0, 100) + "..." : content

  const onClickToDetailPage = () => {
    const handler = () => {
      router.push("/signin")
    }

    if (!currentUser) {
      openCustomModalHandler(
        `로그인이 필요합니다.
        로그인 페이지로 이동하시겠습니까?`,
        "confirm",
        handler,
      )
    } else {
      router.push(`projects/${id}`)
    }
  }

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
            <span
              className={`${
                recruit_status
                  ? "bg-[#666666] border-[#666666] text-white"
                  : "bg-white  border-black text-black"
              } px-3 py-1 border-2 text-center rounded-2xl text-[16px] font-[700] `}
            >
              {recruit_status ? "모집 완료" : "모집 중"}{" "}
            </span>
            <h3 className="text-[26px] font-[700]">{title}</h3>
          </div>
          <span className="hidden md:block">
            {formatDate(project_start_date)} - {formatDate(project_end_date)}
          </span>
          <p dangerouslySetInnerHTML={{ __html: cardContent }}></p>
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
          <div className="absolute bottom-0 right-2">
            <Button
              color={"main-lime"}
              handler={onClickToDetailPage}
              text="상세보기"
            />
          </div>
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
