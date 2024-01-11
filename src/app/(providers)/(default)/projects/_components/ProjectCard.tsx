import BookmarkButton from "@/components/BookmarkButton"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { getProjectTech } from "../api"

const ProjectCard = ({ project }: Projects) => {
  const currentUser = "75085234-4b65-4dc7-8efc-679331ad0da2"

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

  const { data: techs } = useQuery({
    queryKey: ["techs"],
    queryFn: () => getProjectTech(id),
    enabled: !!id,
  })

  console.log(id, techs)

  const cardContent =
    content.length > 100 ? content.slice(0, 100) + "..." : content

  return (
    <div className="flex">
      <section className="relative overflow-hidden rounded-xl w-full md:max-w-[498px] md:h-[270px] max-w-[300px] h-[230px] transition-all bg-slate-200 mr-20">
        <Image
          src={"/images/React.jpeg"}
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
            {project_start_date} - {project_end_date}
          </span>
          <p>{cardContent}</p>
        </div>
        <div className="flex justify-between items-center">
          <ul className="flex gap-3 ">
            <li className="flex justify-center items-center border-2 px-3 py-1 rounded-3xl">
              NestJS
            </li>
            <li className="flex justify-center items-center border-2 px-3 py-1 rounded-3xl">
              Spring
            </li>
            <li className="flex justify-center items-center border-2 px-3 py-1 rounded-3xl ">
              C#
            </li>
            <li className="flex justify-center items-center border-2 px-3 py-1 rounded-3xl">
              JAVA
            </li>
          </ul>
          <Link
            href={`projects/${id}`}
            className="absolute bottom-0 right-2 bg-black text-white text-[16px] py-[12px] px-[34px] rounded-3xl"
          >
            지원하기
          </Link>
        </div>

        <div className="absolute top-4 right-2">
          <BookmarkButton projectId={id} currentUser={currentUser} />
        </div>
      </section>
    </div>
  )
}

export default ProjectCard
