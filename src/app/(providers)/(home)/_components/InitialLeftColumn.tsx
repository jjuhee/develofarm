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
    <div>
      <div className="w-[500px] h-[100px] flex flex-col items-center ">
        <div className="mx-0 my-auto p-5 ">
          <Image
            alt="/images/firework.jpg"
            src={
              surfitArticlesBundle
                ? surfitArticlesBundle[0].imgSrc
                : "/images/firework.jpg"
            }
            width={400}
            height={400}
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="flex-shrink-0 font-bold text-[17px] w-[410px] p-3 mt-3">
          {surfitArticlesBundle
            ? surfitArticlesBundle[0].title
            : "제목이 없는 기사 입니다."}

          <div className="text-[14px] p-3">
            {
              surfitArticlesBundle
                ? surfitArticlesBundle[0]?.description || ""
                : "Loading..." // 또는 빈 문자열 또는 다른 로딩 처리 방식
            }
          </div>
          <Link href={surfitArticles[0]?.href}>
            <span className="m-5 text-[13px] hover:border-b hover:border-b-black m-3">
              보러가기
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InitialLeftColumn
