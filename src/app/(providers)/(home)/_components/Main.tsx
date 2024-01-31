"use client"

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"
import "swiper/css/effect-fade"
import Image from "next/image"
import Spacer from "@/components/ui/Spacer"
import { getBookmarksCountEachProject } from "../../(default)/projects/api"
import { useRouter } from "next/navigation"
import Mainbanner from "./Mainbanner"
import MostBookmarked from "./MostBookmarked"
interface TBookmarksCountEachProject {
  id: string | null
  title: string | null
  content: string | null
  picture_url: string | null
}
;[]

export default function Main({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [bookmarksCountProjects, setBookmarksCountProjects] = useState<
    TBookmarksCountEachProject[] | null
  >([])

  useEffect(() => {
    getFetchProject()
  }, [])
  const getFetchProject = async () => {
    const bookmarksCountEachProject = await getBookmarksCountEachProject()
    setBookmarksCountProjects(bookmarksCountEachProject)
    console.log("북마크 gorup화 한 project", bookmarksCountEachProject)
  }

  const onDetailProjectsHandler = (projectId: string) => {
    router.push(`../../projects/${projectId}/`)
  }
  const bannerArray = [{ number: 1 }, { number: 2 }]
  return (
    <>
      <Mainbanner />
      <MostBookmarked />
      {/* 경계 */}
      <Spacer y={100} />
      <div className="mx-y mx-auto p-10 text-2xl font-bold">
        어떤 프로젝트가 관심을 받고 있나요?
      </div>
      <Swiper
        direction="horizontal"
        loop={true}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        slidesPerView={4}
        spaceBetween={20}
        speed={4000}
        effect="fade"
        className="w-full h-[300px] "
      >
        {bookmarksCountProjects

          ?.slice(0, 7)
          .map((list: TBookmarksCountEachProject, index: number) => (
            <SwiperSlide
              key={index}
              className="hover:-translate-y-6 border border-gray-300 rounded-2xl overflow-hidden cursor-pointer "
              onClick={() => onDetailProjectsHandler(list.id as string)}
            >
              <div className="rounded-t-lg w-full h-[70%] group-hover:border-transparent transition duration-300 relative overflow-hidden hover:scale-120 ">
                <Image
                  src={list.picture_url ? list.picture_url : ""}
                  alt="대체 텍스트"
                  layout="fill" // 부모 요소의 크기에 맞게 설정
                  objectFit="cover" // 이미지를 부모 요소에 맞춤
                />
                <div>ddd</div>
              </div>
              <div className="absolute bottom-0 left-0 text-black h-[30%] w-full">
                <div className="mb-2">
                  <h2 className="text-[17px] font-bold pt-2 pl-2">
                    {list.title
                      ? list.title.length > 23
                        ? list.title.slice(0, 23) + "..."
                        : list.title
                      : ""}
                  </h2>
                  <p className="text-[12px] pt-2 pl-2">
                    {list.content
                      ? list.content
                          .replaceAll("<p>", "")
                          .replaceAll("</p>", "").length > 27
                        ? list.content
                            .replaceAll("<p>", "")
                            .replaceAll("</p>", "")
                            .substring(0, 27) + "..."
                        : list.content
                      : ""}
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 flex flex-col items-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="mb-2"></div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <Spacer y={40} />

      <Spacer y={100} />
      <div className="border">
        {" "}
        <div className="w-full h-full relative">
          <div
            className="w-full h-[600px] bg-cover bg-center relative"
            style={{ backgroundImage: `url('/images/banner_wrap.png')` }}
          ></div>
        </div>
      </div>
      {/*  */}
      <Spacer y={100} />
      {children}
      <Spacer y={100} />
      <div className="border">
        {" "}
        <div className="w-full h-full relative">
          <div
            className="w-full h-[450px] bg-cover bg-center relative"
            style={{ backgroundImage: `url('/images/banner_wrap2.png')` }}
          ></div>
        </div>
      </div>
    </>
  )
}
