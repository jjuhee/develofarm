"use client"

import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const ProfileForm = () => {
  const [isActive, setIsActive] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState([])

  const handleSkillSelection = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter((selectedSkill) => selectedSkill !== skill),
      )
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  return (
    <div className="pt-3">
      {/* 유저 데이터 수정 */}
      <div className="flex items-center space-y-4 p-4">
        <img
          src="https://i.namu.wiki/i/11bab2jbR_U-fjyY58rzBgFsC4MwQBhztHGaWaTGOc9YwF0jiQc5hss0fgeXzfawAaatou9H4SOMA1NJv18Fh5UPHqspHSimZaQhD2teJOYICRc2rtehw7qFQ-Cvall90i47JzBZkTvjoxxT3CT66g.webp"
          alt="User Avatar"
          className="w-64 h-64 rounded-full mr-4"
        />
        <div className="text-left pl-3">
          <form>
            <input
              type="text"
              id="nickname"
              name="nickname"
              className="border rounded px-3 py-2 w-[400px] mb-[30px]"
              placeholder="닉네임"
            />
            <div className="flex">
              <div>
                <label
                  htmlFor="contact"
                  className="flex text-lg font-semibold tracking-wide h-[40px]"
                >
                  연락처
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  className="border rounded px-3 py-2 w-[400px]"
                  placeholder="010-0000-0000"
                />
              </div>
              <div className="ml-[200px]">
                <label
                  htmlFor="email"
                  className="flex text-lg font-semibold tracking-wide h-[40px]"
                >
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border rounded px-3 py-2 w-[300px]"
                  placeholder="abc@MailAdress.com"
                />
              </div>
            </div>
            <div className="flex pt-[30px]">
              <div>
                <label
                  htmlFor="job"
                  className="flex text-lg font-semibold tracking-wide h-[40px]"
                >
                  직무
                </label>
                <ul className="flex gap-3 items-center">
                  <li
                    className="relative"
                    onMouseLeave={() => setIsActive(false)}
                  >
                    <label
                      htmlFor="jobOptions"
                      className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full cursor-pointer"
                      onClick={() => setIsActive(!isActive)}
                    >
                      프론트엔드
                      {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </label>
                    <ul
                      className={`absolute flex flex-col bg-slate-50 w-[150px] rounded-lg py-[15px] px-[20px] transition-all ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <li>
                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            id="react"
                            className="mr-2"
                            onChange={() => handleSkillSelection("React")}
                          />
                          React
                        </label>
                      </li>
                      <li>
                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            id="vue"
                            className="mr-2"
                            onChange={() => handleSkillSelection("Vue")}
                          />
                          Vue
                        </label>
                      </li>
                      <li>
                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            id="nextjs"
                            className="mr-2"
                            onChange={() => handleSkillSelection("NextJS")}
                          />
                          NextJS
                        </label>
                      </li>
                    </ul>
                  </li>
                  <div className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full">
                    백엔드 <IoIosArrowDown />
                  </div>
                  <div className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full">
                    디자인 <IoIosArrowDown />
                  </div>
                </ul>
              </div>

              <div className="flex flex-col ml-[170px]">
                <label
                  htmlFor="status"
                  className="flex text-lg font-semibold tracking-wide h-[40px]"
                >
                  상태 업데이트
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue="1"
                  className="flex items-center mb-2 justify-center gap-2 border-[1.5px] border-slate-400 px-[20px] py-[5px] rounded-full"
                >
                  <option value="" disabled>
                    상태를 선택해 주세요
                  </option>
                  <option value="구인 중">구인 중</option>
                  <option value="지원 중">지원 중</option>
                  <option value="참여 중">참여 중</option>
                  <option value="휴식 중">휴식 중</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr className="my-8 border-t-2 border-gray-300" />

      {/* 기술 스텍 선택한거 보여주기 */}
      <div>
        <h2 className="text-2xl font-bold">보유기술</h2>
        <span className="flex gap-3 pt-3">
          {selectedSkills.map((skill) => (
            <p
              key={skill}
              className="border border-red-500 rounded-full p-2 font-bold text-red-500 text-lg pr-3 pl-3"
            >
              {skill}
            </p>
          ))}
        </span>
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>

      {/* 간단 소개글 수정 */}
      <div>
        <h2 className="text-2xl font-bold pb-[40px]">간단 소개글</h2>
        <textarea
          className="p-[10px] resize-none border rounded-md w-full"
          rows="4"
        >
          Volutpat, est id tincidunt dolor eu. Enim dictum aenean ultrices
          pharetra lorem leo cursus. Mollis dui turpis sed suscipit. Mauris
          vestibulum in phasellus velit morbi lobortis varius egestas posuere.
          Commodo purus non adipiscing porttitor lectus nunc, nisi. Urna amet,
          nisl, lectus vel. Aliquam, porttitor quis at vel sed ut montes,
          egestas. Nisl, vestibulum tempor natoque lacinia posuere. Risus id
          tempor turpis faucibus ante volutpat nunc. Viverra iaculis iaculis at
          convallis tellus. Condimentum massa faucibus at porttitor vestibulum
          in.
        </textarea>
        <hr className="my-8 border-t-2 border-gray-300" />
      </div>
    </div>
  )
}

export default ProfileForm
