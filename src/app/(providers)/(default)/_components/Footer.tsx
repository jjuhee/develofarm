import Image from "next/image"
import React from "react"

const Footer = () => {
  return (
    <div className="w-full bg-black text-white hidden lg:block">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto py-[48px]">
        <Image
          src={"/images/logo2.png"}
          alt="footer logo"
          width={120}
          height={20}
        />
        <span className="text-base font-normal text-main-lime">
          © 2024 DeveloFarm. All rights reserved.
        </span>
      </div>
    </div>
  )
}

export default Footer
