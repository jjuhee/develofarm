"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import SelectedLeftColumn from "./SelectedLeftColumn"
import InitialLeftColumn from "./InitialLeftColumn"
import FourRightColumns from "./FourRightColumns"
interface TSurfitArticles {
  description: string
  href: string
  imgSrc: string
  title: string
}

interface Props {
  surfitArticles: TSurfitArticles[]
}

const Column = ({ surfitArticles }: Props) => {
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
            <div className="relative overflow-hidden border border-#ccc col-span-1 row-span-2 rounded-xl shadow-lg">
              {selectedImageNumber !== undefined ? (
                <>
                  {/* 오른쪽 4개의 칼럼중 1개 선택시 왼쪽의 칼럼으로 들어오는 로직 */}
                  <SelectedLeftColumn
                    surfitArticlesBundle={surfitArticlesBundle}
                    selectedImageNumber={selectedImageNumber}
                  />
                </>
              ) : (
                //메인화면 첫 렌더링시 크롤링한 18개의 칼럼중 첫번째 칼럼을 왼쪽 칼럼으로 고정
                <InitialLeftColumn
                  surfitArticlesBundle={surfitArticlesBundle}
                  surfitArticles={surfitArticles}
                />
              )}
            </div>

            {/* 오른쪽의 4개 이미지 */}
            <FourRightColumns
              surfitArticles={surfitArticles}
              setSelectedImageNumber={setSelectedImageNumber}
            />
            {/* {surfitArticles.slice(1, 5).map((surfitArticle, index) => (
                <>
                  <div
                    key={index}
                    className="hover hover:cursor-pointer relative overflow-hidden hover:transform hover:scale-90 transition-transform duration-300 border border-#ccc col-span-1 row-span-2 rounded-xl shadow-lg"
                    style={{}}
                  >
                    <div
                      className="w-full h-full flex flex-col"
                      onClick={() => setSelectedImageNumber(index)}
                    >
                      <div className="flex-grow relative w-full h-3/4">
                        {" "}
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
              ))} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Column
