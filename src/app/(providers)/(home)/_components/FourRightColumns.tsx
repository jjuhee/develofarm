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
        {surfitArticles?.slice(14, 18).map((surfitArticle, index) => (
          <>
            <div
              key={index}
              className="h-[245px] hover hover:cursor-pointer relative overflow-hidden hover:transform hover:scale-90 transition-transform duration-300 border border-#ccc col-span-1 row-span-2 rounded-xl shadow-lg"
            >
              <div
                className="w-full h-full flex flex-col"
                onClick={() => setSelectedImageNumber(index + 13)}
              >
                <div className="flex-shrink-0  ">
                  <div className="font-bold text-[14px] p-5">
                    {surfitArticle.title
                      ? surfitArticle.title.substring(0, 18) + "..."
                      : "제목이 없습니다."}
                  </div>
                  <div className=" text-[12px] text-bold  h-[130px] p-3">
                    <div className="ml-3">
                      {surfitArticle.description
                        ? surfitArticle.description?.length > 130
                          ? surfitArticle.description.substring(0, 130) + "..."
                          : surfitArticle.description
                        : "제목이 없습니다."}
                    </div>
                  </div>
                  <span className="text-[12px] font-bold ml-5 hover hover:border-b hover:border-b-black ">
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
