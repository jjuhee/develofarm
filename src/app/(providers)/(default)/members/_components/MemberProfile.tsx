import useOnClickOutSide from "@/hooks/useOnClickOutSide"
import useMembersStore from "@/store/members"
import { Tables } from "@/types/supabase"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const MemberProfile = () => {
  const dropdownRef = useRef<HTMLInputElement>(null)

  const { selectedMember, memberPosition } = useMembersStore((state) => state)

  const [isActive, setIsActive] = useState(false)

  useOnClickOutSide({ ref: dropdownRef, handler: () => setIsActive(false) })

  // TODO: 현재 유저 프로젝트 가져오기

  // TODO: 유저 기술 스택 가져오기

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex  items-center">
          <div className="w-[123px] h-[123px] bg-gray-300 rounded-full mr-10">
            {/* image */}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[30px] font-[700]">
              {selectedMember.user_nickname}
            </h3>
            <p className="text-[20px] font-[600]">
              {memberPosition.position_name}
            </p>
          </div>
        </div>
        <div className="flex h-full mb-8" ref={dropdownRef}>
          <div className="relative">
            <p
              className=" flex items-center gap-2 bg-black py-2 pl-6 pr-4 rounded-3xl text-white cursor-pointer"
              onClick={() => setIsActive(!isActive)}
            >
              내 프로젝트에 초청하기
              <span>
                {isActive ? (
                  <IoIosArrowUp className="text-[20px]" />
                ) : (
                  <IoIosArrowDown className="text-[20px]" />
                )}
              </span>
            </p>

            <ul
              className={`absolute py-[15px] px-[20px] border-2 w-full mt-2 rounded-2xl transition-all ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <li className="flex items-center justify-between ">
                <p className="text-[15px] font-[500]">프로젝트1</p>
                <span className="text-[10px] font-[700] px-3 py-1 rounded-2xl text-center text-white bg-black cursor-pointer">
                  초청
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h3 className="text-[18px] font-[700]">보유 기술</h3>
        <ul className="flex gap-5 items-center">
          <li className="text-[16px] font-[500] py-1 px-3 border-gray-70 border-2 rounded-3xl">
            React
          </li>
        </ul>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h3 className="text-[18px] font-[700]">소개글</h3>
        <p className="text-[13px] font-[300] ">
          {" "}
          Volutpat, est id tincidunt dolor eu. Enim dictum aenean ultrices
          pharetra lorem leo cursus. Mollis dui turpis sed suscipit. Mauris
          vestibulum in phasellus velit morbi lobortis varius egestas posuere.
          Commodo purus non adipiscing porttitor lectus nunc, nisi. Urna amet,
          nisl, lectus vel. Aliquam, porttitor quis at vel sed ut montes,
          egestas. Nisl, vestibulum tempor natoque lacinia posuere. Risus id
          tempor turpis faucibus ante volutpat nunc. Viverra iaculis iaculis at
          convallis tellus. Condimentum massa faucibus at porttitor vestibulum
          in.
        </p>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h3 className="text-[18px] font-[700]">포트폴리오</h3>
        <p>업데이트 예정입니다.</p>
      </div>
      <div className="flex w-full">
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-[18px] font-[700]">Blog</h3>
          <p>blog 주소</p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-[18px] font-[700]">GitHub</h3>
          <p>GitHub 주소</p>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Link
          href={`/profile/${selectedMember?.id}`}
          className="border-2 border-black py-2 px-4 rounded-3xl cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
        >
          자세히 보기
        </Link>
      </div>
    </>
  )
}

export default MemberProfile
