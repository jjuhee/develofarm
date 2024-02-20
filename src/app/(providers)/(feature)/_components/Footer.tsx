import Image from "next/image"
import React from "react"

const Footer = () => {
  return (
    <div className="w-full bg-black text-white">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto py-[36px]">
        <Image
          src={"/images/logo2.png"}
          alt="footer logo"
          width={171}
          height={42}
        />
        <div className="flex gap-10 text-xs font-bold">
          <span>이용약관</span>
          <span>개인정보처리방침</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
