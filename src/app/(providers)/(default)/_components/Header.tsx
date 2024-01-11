import Link from "next/link"
import React from "react"
import { IoMdSearch } from "react-icons/io"
import { VscBell } from "react-icons/vsc"

const Header = () => {
  return (
    <div className="flex w-full bg-gray-200">
      <div className="flex justify-between items-center w-[1440px] h-[108px] my-0 mx-auto">
        <Link href={"/"}>home</Link>
        <nav className="flex items-center gap-5 ml-40">
          <Link href={"/projects"}>프로젝트</Link>
          <Link href={"/members"}>인재풀</Link>
        </nav>
        <nav className="flex items-center  gap-4">
          <Link href={"/search"} className="text-lg">
            <IoMdSearch />
          </Link>
          <Link href={"/signin"}>통합로그인</Link>
          <span className="text-md">
            <VscBell />
          </span>
          <Link href={"/profile"}>마이페이지</Link>
        </nav>
      </div>
    </div>
  )
}

export default Header