"use client"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import Image from "next/image"
import javascript from "/public/images/language/javascript_logo.png"

const bannerArray = [
  {
    title: "프론트엔드 개발자",
    bannerDescription: [
      {
        name: "REACT",
        img: "/images/language/react_logo.png",
      },
      { name: "JAVASCRIPT", img: javascript },
      { name: "JQUERY", img: "/images/language/jquery_logo.png" },
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
const Mainbanner = () => {
  return (
    <>
      {bannerArray.map((list: any, index) => (
        <div key={index}>
          <div className="group  border border-gray-200 bg-main-lime">
            <div className="group relative invisible group-hover:visible bg-white ">
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
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                slidesPerView={3}
                spaceBetween={20}
                speed={4000}
                effect="fade"
                className="w-full h-[110px] bg-black "
              >
                {list.bannerDescription.map((list: any, index: number) => (
                  <SwiperSlide
                    key={index}
                    className="  flex items-center rounded-3xl   w-[100px] "
                  >
                    {/* 이미지 */}
                    <div className="flex items-center">
                      <div className="ml-3 mr-3 rounded-3xl text-[30px] text-white font-bold">
                        {list.name}
                      </div>
                      <div className="content-justify m-2  p-4 rounded-full w-[55%] h-[90px] transition duration-300 overflow-hidden relative">
                        <Image
                          // src={list.img ? list.img : ""}
                          src={"/images/firework.jpg"}
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
      <div
        className="group border border-gray-200 flex items-center justify-center h-[110px]"
        style={{ backgroundColor: "#b8ff65" }}
      >
        <span className="text-[40px]">디벨로팜 입니다.</span>
      </div>
    </>
  )
}

export default Mainbanner
