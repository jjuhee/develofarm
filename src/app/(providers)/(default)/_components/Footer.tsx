import Image from "next/image"
import React from "react"

const Footer = () => {
  return (
    <div className="w-full bg-black items-center text-white hidden md:block">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto py-[48px]">
        <Image
          src={"/images/logo2.png"}
          alt="footer logo"
          width={300}
          height={200}
          className="w-[172px] h-[42px]"
        />
        <span className="text-base font-normal text-main-lime">
          © 2024 DeveloFarm. All rights reserved.
        </span>
      </div>
    </div>
  )
}

export default Footer
