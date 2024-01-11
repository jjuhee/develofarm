import BookmarkButton from "@/components/BookmarkButton"
import Image from "next/image"
import Link from "next/link"

const ProjectCard = () => {
  const content =
    "The only moment, the only life we have is in the NOW. What happened afew moments or several years ago is gone, what will happen thisevening, or next month when we go on holidays is not here yet."

  const cardContent =
    content.length > 100 ? content.slice(0, 100) + "..." : content

  return (
    // TODO: 아이템 누르면 디테일 페이지로 이동(/projects/:id)
    <Link href={`projects/1`} className="flex">
      <section className="relative overflow-hidden rounded-xl w-full md:max-w-[498px] md:h-[270px] max-w-[300px] h-[230px] transition-all bg-slate-200 mr-20">
        <Image
          src={"/images/React.jpeg"}
          alt="project"
          fill
          sizes="auto"
          className="object-cover w-full h-full transition group-hover:scale-110 "
        />
      </section>
      <section className="relative flex flex-col pt-5 gap-4 w-full">
        <div className="flex gap-3 items-center">
          <span className="bg-gray-300 px-2 py-1 rounded-md text-[20px] font-[700] text-white">
            모집 중{" "}
          </span>
          <h3 className="text-[26px] font-[700]">프로젝트 구인 타이틀</h3>
        </div>
        {/* TODO: sm보다 작을 떄 display none */}
        <span>0000.00.00 - 0000.00.00</span>
        <p>{cardContent}</p>
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
          {/* TODO: sm보다 작을 떄 display none */}
          <button className="bg-black text-white text-[16px] py-[12px] px-[34px] rounded-3xl">
            지원하기
          </button>
        </div>

        {/* TODO: 북마크 컴포넌트 분리 */}
        <div className="absolute top-4 right-3">
          <BookmarkButton />
        </div>
      </section>
    </Link>
  )
}

export default ProjectCard
