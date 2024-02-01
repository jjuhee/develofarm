import Image from "next/image"
import Link from "next/link"
import React from "react"
interface TSurfitArticles {
  description: string
  href: string
  imgSrc: string
  title: string
}
interface SurfitArticlesProps {
  surfitArticlesBundle: TSurfitArticles[] | undefined
  surfitArticles: TSurfitArticles[]
}
const InitialLeftColumn = ({
  surfitArticlesBundle,
  surfitArticles,
}: SurfitArticlesProps) => {
  return (
    <>
      <div className="w-full h-full flex flex-col  ">
        <div className="flex-grow relative w-full h-full">
          <Image
            alt="/images/firework.jpg"
            src={
              surfitArticlesBundle
                ? surfitArticlesBundle[0].imgSrc
                : "/images/firework.jpg"
            }
            layout="fill" // 부모 요소의 크기에 맞게 설정
            objectFit="cover" // 이미지를 부모 요소에 맞춤
          />
        </div>

        <div className="flex-shrink-0 font-bold text-[12px] p-3">
          {surfitArticlesBundle
            ? surfitArticlesBundle[0].title
            : "제목이 없는 기사 입니다."}
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
    </>
  )
}

export default InitialLeftColumn
