import React from "react"

const ProfileResume = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">보유기술</h2>
        <span className="flex gap-3 pt-3">
          <p className="border border-red-500 rounded-full p-2 font-bold text-red-500 text-lg pr-3 pl-3">
            React
          </p>
          <p className="border border-red-500 rounded-full p-2 font-bold text-red-500 text-lg pr-3 pl-3">
            Next.js
          </p>
          <p className="border border-red-500 rounded-full p-2 font-bold text-red-500 text-lg pr-3 pl-3">
            C#
          </p>
          <p className="border border-red-500 rounded-full p-2 font-bold text-red-500 text-lg pr-3 pl-3">
            JavaScript
          </p>
          <p className="border border-red-500 rounded-full p-2 font-bold text-red-500 text-lg pr-3 pl-3">
            Java
          </p>
        </span>
      </div>
      <hr className="my-8 border-t-2 border-gray-300" />
      <div>
        <h2 className="text-2xl font-bold pt-5">간단 소개글</h2>
        <p className="pt-5">
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
      <hr className="my-[70px] border-t-2 border-gray-300" />
      <div className="flex justify-between items-center w-[1200px] h-[108px] my-0 mx-auto my-[100px]">
        <div>
          <h2 className="text-2xl font-bold pt-5 ">경력</h2>
          <div className="flex pt-5">
            <span>
              <p>YYYY.MM - YYYY.MM</p>
            </span>

            <span className="pl-[100px]">
              <h3 className="text-lg font-semibold">회사명 : 내일배움컴퍼니</h3>
              <p>담당직무 : 프론트엔드 개발자</p>
            </span>
          </div>
          <hr className="my-8 border-t-2 border-gray-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold pt-5">학력</h2>
          <div className="flex pt-5">
            <span>
              <p>YYYY.MM - YYYY.MM</p>
            </span>

            <span className="pl-[100px]">
              <h3 className="text-lg font-semibold">학교명 : 내일배움스쿨</h3>
              <p>전공 및 학위 : 컴퓨터 공학과</p>
            </span>
          </div>
          <hr className="my-8 border-t-2 border-gray-300" />
        </div>
      </div>

      <div className="flex justify-between items-center w-[1200px] h-[108px] my-0 mx-auto my-[100px]">
        <div>
          <h2 className="text-2xl font-bold pt-5">교육/활동</h2>
          <div className="flex pt-5">
            <span>
              <p>YYYY.MM - YYYY.MM</p>
            </span>
            <span className="pl-[100px]">
              <h3 className="text-lg font-semibold">활동명 : 내일배움캠프</h3>
              <p>활동 내용 : 프론트엔드 교육 수료</p>
            </span>
          </div>
          <hr className="my-8 border-t-2 border-gray-300" />
        </div>

        <div className="pr-[30px]">
          <h2 className="text-2xl font-bold pt-5">자격/어학/수상</h2>
          <div className="flex pt-5">
            <span>
              <p>YYYY.MM - YYYY.MM</p>
            </span>

            <span className="pl-[100px]">
              <h3 className="text-lg font-semibold">활동명 : 내일배움상장</h3>
              <p>활동 내용 : 개근상</p>
            </span>
          </div>
          <hr className="my-8 border-t-2 border-gray-300" />
        </div>
      </div>
    </div>
  )
}

export default ProfileResume
