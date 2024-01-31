"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface TSurfitArticles {
  description: string
  href: string
  imgSrc: string
  title: string
}

interface Props {
  surfitArticles: TSurfitArticles[]
}

const Column: React.FC<Props> = ({ surfitArticles }: Props) => {
  const [selectedImageNumber, setSelectedImageNumber] = useState<
    number | undefined
  >(undefined)

  const [surfitArticlesBundle, setSurfitArticlesBundle] = useState<
    TSurfitArticles[] | undefined
  >()
  useEffect(() => {
    setSurfitArticlesBundle(surfitArticles)
  })
  const onGetsurfitArticlesRandom = ({ surfitArticles }: Props) => {
    surfitArticles.sort(() => Math.random() - 0.5)
  }

  //받아오는 기사를 랜덤으로 섞어주기

  //surfitArticles에 데이터가 들어가 있음
  return (
    <div>
      <div className="my-0 mx-auto p-10 text-2xl font-bold text-center">
        인기 칼럼
      </div>
      <div className="w-[1000px] my-0 mx-auto">
        <div className="h-[500px]">
          <div className="grid grid-cols-2 grid-rows-1 gap-x-2 h-full">
            {/* 왼쪽의 큰 이미지 */}
            <div className="relative overflow-hidden border border-#ccc col-span-1 row-span-2 rounded-xl shadow-lg">
              {selectedImageNumber !== undefined ? (
                <div className="w-full h-full flex flex-col opacity-100 transition-opacity duration-500">
                  <div className="flex-grow relative w-full h-full">
                    <Image
                      alt="대체이미지"
                      src={
                        surfitArticlesBundle
                          ? surfitArticlesBundle[selectedImageNumber + 1]
                              ?.imgSrc
                          : "/images/Frame1.png"
                      }
                      layout="fill" // 부모 요소의 크기에 맞게 설정
                      objectFit="cover" // 이미지를 부모 요소에 맞춤
                    />
                  </div>
                  <div className="flex-shrink-0 font-bold text-[12px] p-3">
                    {
                      surfitArticlesBundle
                        ? surfitArticlesBundle[selectedImageNumber + 1]
                            ?.title || ""
                        : "" // 또는 빈 문자열 또는 다른 로딩 처리 방식
                    }
                  </div>
                  <div className="text-[10px] p-3">
                    {
                      surfitArticlesBundle
                        ? surfitArticlesBundle[selectedImageNumber + 1]
                            ?.description || ""
                        : "" // 또는 빈 문자열 또는 다른 로딩 처리 방식
                    }
                  </div>
                  <Link
                    href={
                      surfitArticlesBundle
                        ? surfitArticlesBundle[selectedImageNumber + 1]?.href
                        : ""
                    }
                  >
                    <span className="text-[10px] hover:border-b hover:border-b-black m-3">
                      보러가기
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col  ">
                  <div className="flex-grow relative w-full h-full">
                    <Image
                      alt="/images/firework.jpg"
                      src={
                        surfitArticlesBundle
                          ? surfitArticlesBundle[0]?.imgSrc === undefined
                            ? "/images/firework.jpg"
                            : surfitArticlesBundle[0].imgSrc
                          : "/images/Frame1.png"
                      }
                      layout="fill" // 부모 요소의 크기에 맞게 설정
                      objectFit="cover" // 이미지를 부모 요소에 맞춤
                    />
                  </div>
                  <div className="flex-shrink-0 font-bold text-[12px] p-3">
                    {
                      surfitArticlesBundle
                        ? surfitArticlesBundle[0]?.title === undefined
                          ? "제목이 없는 기사 입니다."
                          : surfitArticlesBundle[0].title
                        : "Loading..." // 또는 빈 문자열 또는 다른 로딩 처리 방식
                    }
                  </div>
                  <div className="text-[10px] p-3">
                    {
                      surfitArticlesBundle
                        ? surfitArticlesBundle[0]?.description || ""
                        : "Loading..." // 또는 빈 문자열 또는 다른 로딩 처리 방식
                    }
                  </div>
                  <Link href={surfitArticles[0]?.href}>
                    <span className="text-[10px] hover:border-b hover:border-b-black m-3">
                      보러가기
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3" key={2}>
              {/* 오른쪽의 4개 이미지 */}

              {surfitArticles.slice(1, 5).map((surfitArticle, index) => (
                <>
                  <div
                    key={index}
                    className="hover hover:cursor-pointer relative overflow-hidden hover:transform hover:scale-90 transition-transform duration-300 border border-#ccc col-span-1 row-span-2 rounded-xl shadow-lg"
                    // onClick={() => setSelectedImageNumber(index)}
                    style={{}}
                  >
                    <div
                      className="w-full h-full flex flex-col"
                      onClick={() => setSelectedImageNumber(index)}
                    >
                      <div className="flex-grow relative w-full h-3/4">
                        {" "}
                        {/* 이미지가 부모 div의 70%만 차지하도록 수정 */}
                        <img
                          src={surfitArticle.imgSrc ? surfitArticle.imgSrc : ""}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-shrink-0 ">
                        <div className="font-bold text-[10px] p-3">
                          {surfitArticle.title
                            ? surfitArticle.title
                            : "제목이 없습니다."}
                        </div>
                        <span className="text-[10px] ml-2 hover hover:border-b hover:border-b-black my-3 ">
                          <Link
                            href={surfitArticle?.href ? surfitArticle.href : ""}
                          >
                            보러가기
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Column
