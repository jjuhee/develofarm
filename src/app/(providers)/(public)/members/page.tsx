import React from "react"
import MemberCard from "./_components/MemberCard"
import Spacer from "@/components/ui/Spacer"
import MemberCategory from "./_components/MemberCategory"

const MembersPage = () => {
  return (
    <div>
      <Spacer y={90} />
      <div className="flex w-full">
        <MemberCategory />

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
