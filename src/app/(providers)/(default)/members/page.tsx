"use client"

import React, { useEffect, useRef } from "react"
import MemberCard from "./_components/MemberCard"
import Spacer from "@/components/ui/Spacer"
import MemberCategory from "./_components/MemberCategory"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "./api"
import { Tables } from "@/types/supabase"
import useCategoryStore from "@/store/category"
import useMembersStore from "@/store/members"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import MemberProfile from "./_components/MemberProfile"
import { supabaseForClient } from "@/supabase/supabase.client"
import { supabaseForServer } from "@/supabase/supabase.server"

const MembersPage = () => {
  useEffect(() => {
    getAuth()
  }, [])

  const getAuth = async () => {
    const { data, error } = await supabaseForClient.auth.getSession()
    console.log(data)
    return data
  }

  const { data: users } = useQuery({ queryKey: ["users"], queryFn: getUsers })

  const title = useCategoryStore((state) => state.title)

  const { viewMemberModal, setViewMemberModal } = useMembersStore(
    (state) => state,
  )

  const modalRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (viewMemberModal) {
      document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`
      return () => {
        const scrollY = document.body.style.top
        document.body.style.cssText = ""
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
      }
    }
  }, [viewMemberModal])

  useOnClickOutSide({ ref: modalRef, handler: () => setViewMemberModal(false) })

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
      {viewMemberModal && (
        <div className="flex justify-center items-center fixed w-full top-0 left-0 h-full backdrop-blur-sm bg-black bg-opacity-50 z-20">
          <div
            className="flex flex-col bg-white w-[732px] h-auto py-10 px-[50px] gap-8 rounded-3xl"
            ref={modalRef}
          >
            <MemberProfile />
          </div>
        </div>
      )}
    </div>
  )
}

export default MembersPage
