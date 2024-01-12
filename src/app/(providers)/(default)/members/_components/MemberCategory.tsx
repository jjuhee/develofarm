import React from "react"

const MemberCategory = () => {
  return (
    <ul className="flex flex-col px-[32px] py-[48px] w-[208px] h-[328px] gap-[20px] rounded-2xl text-[17px] text-[#777E90] font-[700] shadow-2xl">
      {/* TODO: isActive 시 bold 지정하기*/}
      <li>전체보기</li>
      <li>프론트엔드</li>
      <li>백엔드</li>
      <li>디자인</li>
      <li>기획</li>
    </ul>
  )
}

export default MemberCategory
