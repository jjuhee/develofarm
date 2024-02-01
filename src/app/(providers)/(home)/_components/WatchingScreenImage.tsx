import Spacer from "@/components/ui/Spacer"
import Image from "next/image"
import React from "react"

const WatchingScreenImage = () => {
  return (
    <div>
      <Spacer y={100} />
      <div className="border">
        <div className="w-full h-full relative">
          <div className="w-full h-[600px] relative">
            <Image
              src="/images/mainbanner2.png"
              alt="Banner Wrap Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchingScreenImage
