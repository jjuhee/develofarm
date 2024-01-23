"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
interface SurfitArticles {
  description: string
  href: string
  imgSrc: string
  title: string
}
interface props {
  surfitArticles: SurfitArticles[]
}

const Column: React.FC<props> = ({ surfitArticles }: props) => {
  const [selectedImageNumber, setSelectedImageNumber] = useState<
    number | undefined
  >(undefined)

  console.log("셀렉트 이미지 넘버", selectedImageNumber)
  const [surfitArticlesBundle, setSurfitArticlesBundle] = useState<
    SurfitArticles[] | undefined
  >()
  useEffect(() => {
    setSurfitArticlesBundle(surfitArticles)
  })
  console.log(
    "setsurfitarticles",
    Array.isArray(surfitArticles)
      ? surfitArticlesBundle && surfitArticlesBundle[0]
      : "",
  )
  const onGetsurfitArticlesRandom = ({ surfitArticles }: props) => {
    surfitArticles.sort(() => Math.random() - 0.5)
  }

  //받아오는 기사를 랜덤으로 섞어주기

  //surfitArticles에 데이터가 들어가 있음
  return (
    <div>
      <div className="w-[900px] my-0 mx-auto">
        <div className="h-[300px]">
          <div className="grid grid-cols-2 grid-rows-1 gap-x-2 h-full">
            {/* 왼쪽의 큰 이미지 */}
            <div className="relative overflow-hidden border border-black col-span-1 row-span-2 rounded-xl">
              {selectedImageNumber !== undefined ? (
                <div className="w-full h-full flex flex-col opacity-100 transition-opacity duration-500">
                  <div className="flex-grow relative w-full h-full">
                    <Image
                      alt="대체이미지"
                      src={
                        surfitArticlesBundle
                          ? surfitArticlesBundle[selectedImageNumber + 1]
                              ?.imgSrc
                          : ""
                      }
                      layout="fill" // 부모 요소의 크기에 맞게 설정
                      objectFit="cover" // 이미지를 부모 요소에 맞춤
                    />
                  </div>
                  <div className="flex-shrink-0">
                    제목
                    {
                      surfitArticlesBundle
                        ? surfitArticlesBundle[selectedImageNumber + 1]
                            ?.title || ""
                        : "Loading..." // 또는 빈 문자열 또는 다른 로딩 처리 방식
                    }
                    <div>
                      내용
                      {
                        surfitArticlesBundle
                          ? surfitArticlesBundle[selectedImageNumber + 1]
                              ?.description || ""
                          : "Loading..." // 또는 빈 문자열 또는 다른 로딩 처리 방식
                      }
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col opacity-100 transition-opacity duration-500">
                  <div className="flex-grow relative w-full h-full">
                    <Image
                      alt="대체이미지"
                      src={
                        surfitArticlesBundle
                          ? surfitArticlesBundle[0]?.imgSrc
                          : ""
                      }
                      layout="fill" // 부모 요소의 크기에 맞게 설정
                      objectFit="cover" // 이미지를 부모 요소에 맞춤
                    />
                  </div>
                  <div className="flex-shrink-0">
                    제목
                    {
                      surfitArticlesBundle
                        ? surfitArticlesBundle[0]?.title || ""
                        : "Loading..." // 또는 빈 문자열 또는 다른 로딩 처리 방식
                    }
                    <div>
                      내용
                      {
                        surfitArticlesBundle
                          ? surfitArticlesBundle[0]?.description || ""
                          : "Loading..." // 또는 빈 문자열 또는 다른 로딩 처리 방식
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* 오른쪽의 4개 이미지 */}

              {/* {onGetsurfitArticlesRandom({surfitArticles)} */}
              {surfitArticles.slice(1, 5).map((surfitArticle, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden border border-black col-span-1 row-span-1 rounded-xl"
                  onClick={() => setSelectedImageNumber(index)}
                  style={{}}
                >
                  <div className="w-full h-full flex flex-col">
                    <div className="flex-grow">
                      <img src={surfitArticle.imgSrc} width={100} />
                    </div>
                    <div className="flex-shrink-0 text-xs">
                      <div>제목{surfitArticle.title}</div>
                      <div>내용{surfitArticle.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Column
