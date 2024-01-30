import React from "react"

const Footer = () => {
  return (
    <div className="w-full bg-black text-white">
      <div className="flex justify-between w-[1250px] my-0 mx-auto py-20">
        <div>
          <p>개발하는 사람들의 공간</p>
        </div>
        <div className="flex gap-10">
          <div>
            <h4>Service</h4>
            <p>서비스 소개</p>
          </div>
          <div>
            <h4>Contact Us</h4>
            <p>develofarm@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
