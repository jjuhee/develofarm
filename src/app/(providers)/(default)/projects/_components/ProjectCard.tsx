import Image from "next/image"
import Link from "next/link"
import formatDate from "@/utils/formatDate"
import BookmarkButton from "@/components/BookmarkButton"
import type { Tables } from "@/types/supabase"
import parse from "html-react-parser"
import { useCustomModal } from "@/hooks/useCustomModal"
import { useRouter } from "next/navigation"

interface Props {
  project: Tables<"projects">
  bookmarks: Tables<"bookmarks">[]
  currentUser: string
}

const ProjectCard = ({ project, bookmarks, currentUser, techs }: Props) => {
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

  const parsedContent = parse(content) as string

  const cardContent =
    content?.length > 100 ? parsedContent.slice(0, 100) + "..." : parsedContent

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
                recruit_status ? "bg-[#666666]" : "bg-[#297A5F]"
              } px-3 py-1 text-center rounded-md text-[20px] font-[700] text-white`}
            >
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
            {project_tech?.map((tech, i) => (
              <li
                key={i}
                className="flex justify-center items-center border-2 px-3 py-1 rounded-3xl"
              >
                {tech && tech?.techs?.tech_name}
              </li>
            ))}
          </ul>
          <button
            className="absolute bottom-0 right-2 border-2 border-[#297A5F] text-[#297A5F] text-[16px] font-[700] py-2 px-6 rounded-3xl hover:bg-[#297A5F] hover:text-white transition-all duration-300"
            onClick={onClickToDetailPage}
          >
            상세보기
          </button>
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
