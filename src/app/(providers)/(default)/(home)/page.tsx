"use client"
import React, { useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-coverflow"
import "swiper/css/effect-fade"
export default function Home() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const images = ["Image 1", "Image 2", "Image 3", "Image 4", "Image 5"]

  return (
    <>
      <div className="border border-black flex flex-col justify-center items-center min-h-screen relative">
        <div className="w-[400px]">
          <Swiper
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom", // 직접 요소를 지정
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="ml-5">Slide 1</div>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
          </Swiper>
          {/* 추가된 부분: 직접 요소를 지정하여 위치를 조절 */}
          <div className="swiper-pagination swiper-pagination-custom"></div>
          <div className="swiper-button-next swiper-button-next-custom"></div>
          <div className="swiper-button-prev swiper-button-prev-custom"></div>
        </div>
      </div>

      {/* 경계 */}

      <Swiper
        loop={true}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 0,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        slidesPerView={4}
        speed={4000}
        effect="fade"
        className="border border-black w-[1000px] h-[300px]"
      >
        <SwiperSlide>slide1</SwiperSlide>
        <SwiperSlide>slide2</SwiperSlide>
        <SwiperSlide>slide3</SwiperSlide>
        <SwiperSlide>slide4</SwiperSlide>
        <SwiperSlide>slide5</SwiperSlide>
        <SwiperSlide>slide6</SwiperSlide>
        <SwiperSlide>slide7</SwiperSlide>
      </Swiper>

      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {/* 왼쪽의 큰 이미지 */}
        <div className="relative overflow-hidden border border-black col-span-1 row-span-2">
          {selectedImage !== null && (
            <div className="w-full h-full opacity-100 transition-opacity duration-500">
              {images[selectedImage]}
            </div>
          )}
        </div>

        {/* 오른쪽의 4개 이미지 */}
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="relative overflow-hidden border border-black col-span-1 row-span-1"
            onClick={() => setSelectedImage(index)}
          >
            <div className="w-full h-full">{images[index]}</div>
          </div>
        ))}
      </div>

      {/* <div className="flex flex-col justify-center items-center min-h-screen">
        <section className="border border-black w-[90%] h-[80%]">인기 </section>
      </div> */}

      <div className="flex flex-col justify-center items-center min-h-screen">
        <section className="border border-black w-[90%] h-[80%]">칼럼</section>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <section className="border border-black w-[90%] h-[80%]">
          유저후기
        </section>
      </div>
    </>
  )
}
