"use client"

import { TProjectType } from "@/types/extendedType"
import Image from "next/image"
import React, { useState } from "react"

type Props = {
  project: TProjectType
}

const ThumbnailImageInfo = ({ project }: Props) => {
  const [showImage, setShowImage] = useState(false)

  return (
    project.picture_url !==
      "https://aksbymviolrkiainilpq.supabase.co/storage/v1/object/public/project_image/common/project_default.png" && (
      <>
        <button
          className="ml-3 mt-1"
          onClick={() => setShowImage((prev) => !prev)}
        >
          <Image
            width={24}
            height={24}
            src="/icons/thumbnailIcon.png"
            alt="썸네일 아이콘"
            className="w-[50px] h-[30px] sm:w-[24px] sm:h-[24px] md:w-[24px] md:h-[24px] lg:w-[24px] lg:h-[24px]"
          />
        </button>
        {showImage && (
          <div className="absolute outline-none left-0 top-[130px] bottom-[200px] right-[20px] md:left-[370px] md:top-[60px] md:right-[20px] md:bottom-0 lg:left-[60px] lg:top-[50px] lg:right-0 lg:bottom-[20px] z-10">
            <Image
              width={453}
              height={273}
              src={`${project?.picture_url}`}
              alt="게시물 썸네일 이미지"
              className="absolute rounded-3xl w-[320px] h-[180px] lg:w-[453px] lg:h-[273px]"
            />
          </div>
        )}
      </>
    )
  )
}

export default ThumbnailImageInfo
