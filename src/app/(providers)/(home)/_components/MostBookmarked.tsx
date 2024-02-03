"use client"
import Image from "next/image"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import Spacer from "@/components/ui/Spacer"
import { useRouter } from "next/navigation"

interface TBookmarksCountEachProject {
  id: string
  title: string
  content: string
  picture_url: string
}
;[]

interface MostBookmarkedProps {
  bookmarksCountProjects: TBookmarksCountEachProject[] | null
}
const MostBookmarked = ({ bookmarksCountProjects }: MostBookmarkedProps) => {
  const router = useRouter()
  const onDetailProjectsHandler = (projectId: string) => {
    router.push(`/projects/${projectId}/`)
  }

  const MostBookmarkedProjectsArray = [
    { number: 1, reverseDirection: false },
    { number: 2, reverseDirection: true },
  ]
  return (
    <div>
      {" "}
      <Spacer y={100} />
      <div className="mx-y mx-auto p-10 text-2xl font-bold">
        어떤 프로젝트가 관심을 받고 있나요?
      </div>
      {MostBookmarkedProjectsArray.map((arr) => {
        return (
          <div>
            <Swiper
              direction="horizontal"
              loop={true}
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 0,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
                reverseDirection: arr.number == 1 ? false : true,
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
                    onClick={() => onDetailProjectsHandler(list.id)}
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
                          {list.title.length > 23
                            ? list.title.slice(0, 23) + "..."
                            : list.title}
                        </h2>
                        <p className="text-[12px] pt-2 pl-2">
                          {list.content
                            .replaceAll("<p>", "")
                            .replaceAll("</p>", "").length > 27
                            ? list.content
                                .replaceAll("<p>", "")
                                .replaceAll("</p>", "")
                                .substring(0, 27) + "..."
                            : list.content
                                .replaceAll("<p>", "")
                                .replaceAll("</p>", "")}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 flex flex-col items-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="mb-2"></div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        )
      })}
      <Spacer y={40} />
    </div>
  )
}

export default MostBookmarked
