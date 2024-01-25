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
import { getBookmarksCountEachProject } from "../../projects/api"

export default function Main({ children }: { children: React.ReactNode }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [projectData, setProjectData] = useState<number>()

  const images = ["Image 1", "Image 2", "Image 3", "Image 4", "Image 5"]

  const [popularProjects, setPopularProjects] = useState([])
  const [crawledData, setCrawledData] = useState(false)

  const onCrwalingDataHandler = () => {
    setCrawledData(true)
  }

  const getFetchProject = async () => {
    const bookmarksCountEachProject = await getBookmarksCountEachProject()
    console.log("북마크가 많은 순으로 프로젝트 갯수", bookmarksCountEachProject)
  }

  getFetchProject()
  useEffect(() => {
    //토큰 가져오는 함수
    // const localStorageAuth = () => {
    //   const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN
    //   const userInfo = localStorage.getItem(`${AUTH_TOKEN}`)
    //   console.log("어떻게 나오는 거지 ?", userInfo)
    // }
    // localStorageAuth()
  }, [])

  const arr = [
    {
      title: "제목1",
      content: "내용1",
      img: "https://content.surfit.io/thumbs/image/K2lP5/YYnRj/26981104865aa1e4610a86/cover-top-1x.webp",
    },
    { title: "제목2", content: "내용2" },
    { title: "제목3", content: "내용3" },
    { title: "제목4", content: "내용4" },
    { title: "제목5", content: "내용5" },
    { title: "제목6", content: "내용6" },
    { title: "제목7", content: "내용7" },
  ]
  return (
    <>
      <div className=" flex flex-col justify-center items-center  relative w-full">
        <div className="w-[100%] h-[100%]">
          <Swiper
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
              delay: 30000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className="w-full h-[600px] bg-cover bg-center"
                  style={{ backgroundImage: `url('/images/screenshot.png')` }}
                ></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className="w-full h-[600px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/brainstorming2.jpg')`,
                  }}
                >
                  {" "}
                  <div className="text-white text-3xl font-semibold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    새로운 프로젝트에 합류하세요{" "}
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className="w-full h-[600px] bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images/keyboard.jpg')`,
                  }}
                >
                  {" "}
                  <div className="text-black text-3xl font-semibold absolute z-10 top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-[500px]">
                    <div>develofarm이</div> 당신을 기다리고 있습니다
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* 추가된 부분: 직접 요소를 지정하여 위치를 조절 */}
          <div className="swiper-pagination swiper-pagination-custom"></div>
          <div className="swiper-button-next swiper-button-next-custom"></div>
          <div className="swiper-button-prev swiper-button-prev-custom"></div>
        </div>
      </div>
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
        }}
        slidesPerView={4}
        spaceBetween={20}
        speed={4000}
        effect="fade"
        className="w-full h-[300px]"
      >
        {arr.map((list, index) => (
          <SwiperSlide key={index} className="relative group">
            <div className="rounded-3xl w-full h-[80%] group-hover:border-transparent transition duration-300 relative overflow-hidden">
              <Image
                src="/images/Frame2.png"
                alt="대체 텍스트"
                layout="fill" // 부모 요소의 크기에 맞게 설정
                objectFit="cover" // 이미지를 부모 요소에 맞춤
              />
            </div>
            <div className="absolute bottom-0 left-0 text-black w-full">
              <div className="mb-2">
                <h2 className="text-xl font-bold">{list.title}</h2>
                <p className="text-sm">{list.content}</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 flex flex-col items-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="mb-2">
                {/* 하트 아이콘 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.75-8.55 12.54L12 21.35z"
                  />
                </svg>
              </div>
              <div>
                {/* 북마크 아이콘 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2C7 2 2 7 2 12s5 10 10 10 10-5 10-10-5-10-10-10zm-1 14l-1 1-1-1M12 6v8"
                  />
                </svg>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        direction="horizontal"
        loop={true}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        slidesPerView={4}
        spaceBetween={20}
        speed={4000}
        effect="fade"
        className="w-full h-[300px]"
      >
        {arr.map((list, index) => (
          <SwiperSlide key={index} className="relative group">
            <div className="rounded-3xl w-full h-[80%] group-hover:border-transparent transition duration-300 relative overflow-hidden">
              <Image
                src="/images/Frame1.png"
                alt="대체 텍스트"
                layout="fill" // 부모 요소의 크기에 맞게 설정
                objectFit="cover" // 이미지를 부모 요소에 맞춤
              />
            </div>
            <div className="absolute bottom-0 left-0 text-black w-full">
              <div className="mb-2">
                <h2 className="text-xl font-bold">{list.title}</h2>
                <p className="text-sm">{list.content}</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 flex flex-col items-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="mb-2">
                {/* 하트 아이콘 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.28 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.78-3.4 6.75-8.55 12.54L12 21.35z"
                  />
                </svg>
              </div>
              <div>
                {/* 북마크 아이콘 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2C7 2 2 7 2 12s5 10 10 10 10-5 10-10-5-10-10-10zm-1 14l-1 1-1-1M12 6v8"
                  />
                </svg>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Spacer y={100} />
      <div className="border">
        {" "}
        <div className="w-full h-full relative">
          <div
            className="w-full h-[600px] bg-cover bg-center relative"
            style={{ backgroundImage: `url('/images/banner_wrap.png')` }}
          >
            {/* <div className="text-white text-3xl font-semibold absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              [Developer]: 당신의 꿈을 그려보세요!
            </div> */}
          </div>
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
            className="w-full h-[600px] bg-cover bg-center relative"
            style={{ backgroundImage: `url('/images/banner_wrap2.png')` }}
          ></div>
        </div>
      </div>
    </>
  )
}
