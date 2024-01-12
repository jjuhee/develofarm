import Link from "next/link"
import React from "react"
import { IoMdSearch } from "react-icons/io"
import { VscBell } from "react-icons/vsc"

const Header = () => {
  return (
    <div className="flex w-full bg-gray-200">
      <div className="flex justify-between items-center w-[1250px] h-[108px] my-0 mx-auto">
        <Link href={"/"}>home</Link>
      </div>
    </div>
  )
}

export default Header
