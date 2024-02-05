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
      <div className="w-full h-full flex flex-col items-center ">
        <div className="mx-0 my-auto p-5 ">
          <Image
            alt="대체이미지"
            src={
              surfitArticlesBundle
                ? surfitArticlesBundle[selectedImageNumber + 1]?.imgSrc
                : "/images/Frame1.png"
            }
            width={400}
            height={400}
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="flex-shrink-0 font-bold text-[17px] w-[410px] p-3">
          {
            surfitArticlesBundle
              ? surfitArticlesBundle[selectedImageNumber + 1]?.title.length > 30
                ? surfitArticlesBundle[selectedImageNumber + 1].title.substring(
                    0,
                    30,
                  ) + "..."
                : surfitArticlesBundle[selectedImageNumber + 1].title
              : "" // 또는 빈 문자열 또는 다른 로딩 처리 방식
          }
          <div className="text-[14px] p-3">
            {
              surfitArticlesBundle
                ? surfitArticlesBundle[selectedImageNumber + 1]?.description ||
                  ""
                : "" // 또는 빈 문자열 또는 다른 로딩 처리 방식
            }
          </div>
          <Link href={""}>
            <span className="text-[13px] hover:border-b hover:border-b-black ">
              보러가기
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SelectedLeftColumn
