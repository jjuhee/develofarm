"use client"

import React from "react"
import MemberCard from "./_components/MemberCard"
import Spacer from "@/components/ui/Spacer"
import MemberCategory from "./_components/MemberCategory"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "./api"
import { Tables } from "@/types/supabase"
import useCategoryStore from "@/store/category"

const MembersPage = () => {
  const { data: users } = useQuery({ queryKey: ["users"], queryFn: getUsers })

  const title = useCategoryStore((state) => state.title)

  return (
    <div>
      <Spacer y={90} />
      <div className="flex w-full">
        <MemberCategory />

        <section className="flex flex-col ml-20 py-5 gap-[24px] w-full">
          <h3 className="text-[40px] font-[700]">{title}</h3>
          <p className="text-[16px] font-[400] text-[#606060]">
            {title === "전체보기"
              ? "멤버 전체보기 페이지입니다."
              : `${title} 멤버 페이지입니다.`}
          </p>
          <div className="w-full mt-10">
            <ul className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-3">
              {users?.map((user: Tables<"users">) => (
                <MemberCard key={user.id} user={user} title={title} />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MembersPage
