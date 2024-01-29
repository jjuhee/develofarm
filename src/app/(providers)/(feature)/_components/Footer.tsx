import React from "react"

const Footer = () => {
  return (
    <div className="absolute bottom-0 w-full bg-black text-white">
      <div className="w-[1250px] mx-auto flex justify-between h-[100px] items-center">
        <div>
          <p>개발하는 사람들의 공간</p>
        </div>
        <div className="flex gap-10">
          <h4>이용약관</h4>
          <h4>개인정보처리방침</h4>
        </div>
      </div>
    </div>
  )
}

export default Footer
