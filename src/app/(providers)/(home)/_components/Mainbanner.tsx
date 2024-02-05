"use client"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import Image from "next/image"

const bannerArray = [
  {
    title: "프론트엔드 개발자",
    bannerDescription: [
      {
        name: "JQUERY",
        img: "/images/language/0_jquery.png",
      },
      {
        name: "JAVASCRIPT",
        img: "/images/language/2_JS.png",
      },
      {
        name: "TYPESCRIPT",
        img: "/images/language/3_TS.png",
      },
      { name: "NEXTJS", img: "/images/language/5_nextjs.png" },
      { name: "VUEJS", img: "/images/language/4_vuejs.png" },
    ],
  },
  {
    title: "백엔드엔드 개발자",
    bannerDescription: [
      { name: "SPRING", img: "/images/language/7_Spring.png" },
      {
        name: "JAVA",
        img: "/images/language/8_Java.png",
      },
      { name: "MARIADB", img: "/images/language/9_Mariadb.png" },
      { name: "ORACLE", img: "/images/language/6_oracle.png" },
      { name: "MONGODB", img: "/images/language/10_mongodb.png" },
    ],
  },
  {
    title: "UX/UI 디자이너",
    bannerDescription: [
      { name: "SKETCH", img: "/images/language/14_sketch.png" },
      { name: "ILLUSTRATOR", img: "/images/language/12_ai.png" },
      { name: "XD", img: "/images/language/13_xd.png" },
      { name: "FIGMA", img: "/images/language/15_figma.png" },
    ],
  },
]

const Mainbanner = () => {
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // 3초 후에 hover 효과 적용
    const timer = setTimeout(() => {
      setIsHovered(true)
    }, 3000)

    return () => clearTimeout(timer) // 컴포넌트가 언마운트되면 타이머 클리어
  }, []) //

  return (
    <>
      <>
        <div className="bg-main-lime group border border-gray-200 flex items-center justify-center h-[80px]"></div>
        {/* <div className={`box ${isHovered ? "box-hover" : ""}`}>
          <span style={{ color: isHovered ? "red" : "initial" }}>Hover me</span>
        </div> */}
      </>
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
                      <div className="content-justify m-2 bg-white p-4 rounded-full w-[55%] h-[90px] transition duration-300 overflow-hidden relative">
                        <Image
                          src={list.img ? list.img : ""}
                          alt="대체 텍스트"
                          layout="fill"
                          objectFit="cover" // 변경된 부분
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
      <div className="bg-main-lime group border border-gray-200 flex items-center justify-center h-[110px]">
        <span className="text-[40px]">디벨로팜 입니다.</span>
      </div>
      <div className="bg-main-lime group border border-gray-200 flex items-center justify-center h-[80px]"></div>
    </>
  )
}

export default Mainbanner
