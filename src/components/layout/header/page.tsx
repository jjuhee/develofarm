import Link from "next/link"
import React from "react"

const Header = () => {
  return (
    <div className="flex w-full bg-gray-200">
      <div className="flex justify-between items-center w-[1440px] h-[108px] my-0 mx-auto">
        <Link href={"/"}>home</Link>
        <nav className="flex items-center  gap-2">
          <h3>검색</h3>
          <Link href={"/login"}>통합로그인</Link>
          <Link href={"/profile"}>마이페이지</Link>
        </nav>
      </div>
    </div>
  )
}

export default Header
