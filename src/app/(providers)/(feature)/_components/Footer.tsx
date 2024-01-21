import React from "react"

const Footer = () => {
  return (
    <div className="flex w-full bg-black text-white mt-20">
      <div className="flex justify-between w-[1250px] my-0 mx-auto py-10">
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
