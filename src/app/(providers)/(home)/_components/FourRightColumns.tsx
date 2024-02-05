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
  surfitArticles: TSurfitArticles[] | undefined
  setSelectedImageNumber: (value: number) => void
}
const FourRightColumns = ({
  surfitArticles,
  setSelectedImageNumber,
}: SurfitArticlesProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3" key={2}>
        {surfitArticles?.slice(1, 5).map((surfitArticle, index) => (
          <>
            <div
              key={index}
              className="hover hover:cursor-pointer relative overflow-hidden hover:transform hover:scale-90 transition-transform duration-300 border border-#ccc col-span-1 row-span-2 rounded-xl shadow-lg"
            >
              <div
                className="w-full h-full flex flex-col"
                onClick={() => setSelectedImageNumber(index)}
              >
                <div className="p-2">
                  <div className="flex-grow relative w-full h-3/4">
                    {" "}
                    <Image
                      alt={"대체이미지"}
                      src={surfitArticle.imgSrc ? surfitArticle.imgSrc : ""}
                      width={300}
                      height={300}
                      objectFit="cover"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex-shrink-0 ">
                  <div className="font-bold text-[10px] p-3">
                    {surfitArticle.title
                      ? surfitArticle.title
                      : "제목이 없습니다."}
                  </div>
                  <span className="text-[12px] ml-2 hover hover:border-b hover:border-b-black my-3 ">
                    <Link href={surfitArticle?.href ? surfitArticle.href : ""}>
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
  )
}

export default FourRightColumns
