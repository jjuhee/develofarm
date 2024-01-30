"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import Image from "next/image"

const Mainbanner = () => {
  const bannerArray = [
    {
      title: "프론트엔드 개발자",
      bannerDescription: [
        { name: "REACT", img: "" },
        { name: "JAVASCRIPT", img: "" },
        { name: "JQUERY", img: "" },
        { name: "NEXTJS", img: "" },
        { name: "VUEJS", img: "" },
      ],
    },
    {
      title: "백엔드엔드 개발자",
      bannerDescription: [
        { name: "SPRING", img: "" },
        { name: "KOTLIN", img: "" },
        { name: "C#", img: "" },
        { name: "ORACLE", img: "" },
        { name: "MONGODB", img: "" },
      ],
    },
    {
      title: "UX/UI 디자이너",
      bannerDescription: [
        { name: "SKETCH", img: "" },
        { name: "ILLUSTRATOR", img: "" },
        { name: "XD", img: "" },
        { name: "FIGMA", img: "" },
      ],
    },
  ]
  return (
    <>
      {bannerArray.map((list: any, index) => (
        <div key={index}>
          <div
            className="group  border border-gray-200"
            style={{ backgroundColor: "#b8ff65" }}
          >
            <div
              className="group relative invisible group-hover:visible "
              style={{ backgroundColor: "white" }}
            >
              <span className="visible group-hover:invisible transition-opacity duration-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-[40px] font-bold ">{list.title}</span>
                <span className="text-[40px]">를 위한</span>
              </span>

              {/* 슬라이드 안의 하나의 카드 */}
              <Swiper
                direction="horizontal"
                loop={true}
                modules={[Autoplay, Pagination]}
                autoplay={{
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                slidesPerView={3}
                spaceBetween={20}
                speed={2000}
                effect="slide"
                className="w-full h-[110px] bg-green-300 border border-gray-300"
              >
                {list.bannerDescription.map((list: any, index: number) => (
                  <SwiperSlide
                    key={index}
                    className="   rounded-3xl border border-white  w-[100px] "
                  >
                    {/* 이미지 */}
                    <div className="flex items-center">
                      <div className="mr-3 rounded-3xl text-[30px] text-white font-bold">
                        {list.name}
                      </div>
                      <div className="mr-3 border border-black p-4 rounded-full w-[40%] h-[90px] transition duration-300 overflow-hidden relative">
                        <Image
                          src={"/images/keyboard.jpg"}
                          alt="대체 텍스트"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>

                    <div className="mb-2">
                      <h2 className="text-[25px] font-bold pt-2 pl-2"></h2>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Mainbanner
