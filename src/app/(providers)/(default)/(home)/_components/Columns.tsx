// Deliver 컴포넌트 파일 (예: Deliver.tsx)
"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
// 수정된 DeliverProps 타입
interface DeliverProps {
  surfitArticles: any[]
}

const Deliver: React.FC<DeliverProps> = ({ surfitArticles }: DeliverProps) => {
  // Deliver 컴포넌트 내용
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [crawlData, setCrawlData] = useState<any[]>()
  const [data, setData] = useState([1, 2, 3, 4])

  // useEffect(() => {
  //   setCrawlData(surfitArticles)
  // }, [])

  const images = ["Image 1", "Image 2", "Image 3", "Image 4", "Image 5"]
  return (
    <div>
      <div className="w-[900px] my-0 mx-auto">
        <div className="h-[300px]">
          <div className="grid grid-cols-2 grid-rows-1 gap-x-2 h-full">
            {/* 왼쪽의 큰 이미지 */}
            <div className="relative overflow-hidden border border-black col-span-1 row-span-2 rounded-xl">
              {selectedImage !== null && (
                <div className="w-full h-full flex flex-col opacity-100 transition-opacity duration-500">
                  <div className="flex-grow relative w-full h-full">
                    {images[selectedImage]}
                    <Image
                      alt="대체이미지"
                      src="https://content.surfit.io/thumbs/image/wVRkw/28LOV/210157138265a388fa70731/cover-center-1x.webp"
                      layout="fill" // 부모 요소의 크기에 맞게 설정
                      objectFit="cover" // 이미지를 부모 요소에 맞춤
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <div>제목{[selectedImage]}</div>
                    <div>내용{[selectedImage]}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* 오른쪽의 4개 이미지 */}
              {surfitArticles.slice(0, 4).map((surfitArticle, index) => (
                <div
                  key={surfitArticle.linkHref}
                  className="relative overflow-hidden border border-black col-span-1 row-span-1 rounded-xl"
                  onClick={() => setSelectedImage(index)}
                  style={{
                    transition:
                      "transform 0.5s ease-out, opacity 0.5s ease-out",
                    transform:
                      selectedImage !== null && surfitArticle === selectedImage
                        ? "translateX(-100%) scale(1.1)"
                        : "scale(1)",
                    opacity:
                      selectedImage !== null && surfitArticle === selectedImage
                        ? 0
                        : 1,
                  }}
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

export default Deliver
