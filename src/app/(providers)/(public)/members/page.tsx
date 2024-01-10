import React from "react"
import MemberCard from "./_components/MemberCard"
import Spacer from "@/components/ui/Spacer"

const MembersPage = () => {
  return (
    <div>
      <Spacer y={90} />
      <div className="flex w-full">
        {/* category */}
        <ul className="flex flex-col px-[32px] py-[48px] w-[208px] h-[328px] gap-[20px] bg-gray-100 text-[17px]">
          <li>전체보기</li>
          <li>프론트엔드</li>
          <li>백엔드</li>
          <li>디자인</li>
          <li>기획</li>
        </ul>

        {/* member list */}
        <section className="flex flex-col ml-10 py-5 gap-[24px] w-full">
          <h3 className="text-[40px] font-[700]">전체보기</h3>
          <p className="text-[16px] font-[400] text-[#606060]">
            멤버 전체보기 페이지입니다.
          </p>
          <div className="w-full">
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <MemberCard />
              <MemberCard />
              <MemberCard />
              <MemberCard />
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MembersPage
