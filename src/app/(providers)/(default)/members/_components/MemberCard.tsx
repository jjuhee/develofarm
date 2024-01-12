import React from "react"

const MemberCard = () => {
  // TODO: 현재 구인 중인 멤버 리스트 가져오기

  return (
    // TODO: 클릭 시 프로필 모달 띄우기
    <li className="relative flex justify-center items-end  w-[280px] h-[380px] rounded-md my-[20px] rounded-2xl shadow-2xl mt-20">
      <section className="flex flex-col z-1 p-[12px] gap-[5px] items-center pb-5 px-10">
        <span className="text-[20px] font-[700] leading-[24px]">000님</span>
        <span className="text-[16px] font-[500] leading-[28px]">
          프론트엔드 개발자
        </span>
        <p className="w-full text-[14px] font-[400] leading-[28px] text-center">
          저는 언제나 새로운 도전을 하는 프론트엔드 개발자입니다.
        </p>
        <div className="flex gap-[5px] mt-3">
          <span className="px-3 py-1 rounded-full border-2 text-[12px] font-[400]">
            React
          </span>
          <span className="px-3 py-1 rounded-full border-2 text-[12px] font-[400]">
            NextJS
          </span>
        </div>
      </section>
      <div className="absolute z-10 top-[-70px] w-[230px] h-[230px] bg-gray-200 rounded-full">
        {/* Image */}
      </div>
    </li>
  )
}

export default MemberCard
