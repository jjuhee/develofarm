import NotFoundButtons from "@/components/NotFoundButtons"
import Image from "next/image"
import Link from "next/link"
import React from "react"

function NotFound() {
  return (
    <div className="flex h-[100vh]">
      <div className="m-auto flex flex-col items-center gap-9">
        <Image
          width={45}
          height={45}
          src="/icons/icon404.png"
          alt="경고 아이콘"
        />
        <h2 className="font-[600] text-[18px]">페이지를 찾을 수 없습니다.</h2>
        <div className="text-[14px] flex flex-col items-center">
          <p>존재하지 않는 주소를 입력하셨거나,</p>
          <p>요청하신 페이지의 주소가 변경,삭제되어 찾을 수 없습니다.</p>
        </div>
        <NotFoundButtons />
      </div>
    </div>
  )
}

export default NotFound
