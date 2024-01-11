import React from "react"

const MemberCard = () => {
  // TODO: 현재 구인 중인 멤버 리스트 가져오기

  return (
    // TODO: 클릭 시 프로필 모달 띄우기
    <li className="flex flex-col w-[361px] h-[436px] border-2 rounded-md my-[20px]">
      <div className="w-full h-[261px] bg-gray-200 ">image</div>

      <section className="flex flex-col p-[12px] gap-[5px]">
        <span className="text-[20px] font-[700] leading-[24px]">000님</span>
        <span className="text-[16px] font-[500] leading-[28px]">
          프론트엔드 개발자
        </span>
        <p className="w-full text-[14px] font-[400] leading-[28px]">
          저는 언제나 새로운 도전을 하는 프론트엔드 개발자입니다.
        </p>
        <div className="flex gap-[5px] ">
          <span className="px-3 py-1 rounded-full border-2 text-[12px] font-[400]">
            React
          </span>
          <span className="px-3 py-1 rounded-full border-2 text-[12px] font-[400]">
            NextJS
          </span>
        </div>
      </section>
    </li>
  )
}

export default MemberCard
