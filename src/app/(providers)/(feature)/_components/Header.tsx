import Image from "next/image"
import Link from "next/link"
import React from "react"

const Header = () => {
  return (
    <div className="flex w-full bg-white shadow-lg shadow-gray-200">
      <div className="flex justify-between items-center w-[1250px] h-[96px] my-0 mx-auto px-2 ">
        <Link href={"/"}>
          <Image src={"/images/logo.png"} alt="logo" width={168} height={20} />
        </Link>
      </div>
    </div>
  )
}

export default Header
