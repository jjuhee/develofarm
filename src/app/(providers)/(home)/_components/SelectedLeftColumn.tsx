import React from "react"
import Image from "next/image"
import Link from "next/link"
interface TSurfitArticles {
  description: string
  href: string
  imgSrc: string
  title: string
}
interface SurfitArticlesProps {
  surfitArticlesBundle: TSurfitArticles[] | undefined
  selectedImageNumber: number
}

const SelectedLeftColumn = ({
  surfitArticlesBundle,
  selectedImageNumber,
}: SurfitArticlesProps) => {
  return (
    <div>
      <div className="w-full h-full flex flex-col opacity-100 transition-opacity duration-500">
        <div className="flex-grow relative w-full h-full">
          <Image
            alt="대체이미지"
            src={
              surfitArticlesBundle
                ? surfitArticlesBundle[selectedImageNumber + 1]?.imgSrc
                : "/images/Frame1.png"
            }
            layout="fill" // 부모 요소의 크기에 맞게 설정
            objectFit="cover" // 이미지를 부모 요소에 맞춤
          />
        </div>
        <div className="flex-shrink-0 font-bold text-[12px] p-3">
          {
            surfitArticlesBundle
              ? surfitArticlesBundle[selectedImageNumber + 1]?.title || ""
              : "" // 또는 빈 문자열 또는 다른 로딩 처리 방식
          }
        </div>
        <div className="text-[10px] p-3">
          {
            surfitArticlesBundle
              ? surfitArticlesBundle[selectedImageNumber + 1]?.description || ""
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
    </div>
  )
}

export default SelectedLeftColumn
