import React from "react"
import ProfileCategory from "../_components/ProfileCategory"

const NotificationPage = () => {
  return (
    <div>
      <div className="flex items-center w-[1440px] h-[108px] my-0 mx-auto">
        <ProfileCategory />
      </div>
      <div className="flex justify-between items-center my-0 mx-auto">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="unreadNotificationsCheckbox"
            className="form-checkbox h-6 w-6 text-indigo-600 transition duration-150 ease-in-out"
          />
          <label htmlFor="unreadNotificationsCheckbox" className="ml-2">
            읽지 않은 알림만 보기
          </label>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
          전체 지우기
        </button>
      </div>
      <div>
        <div className="border-t-4 my-4">
          <h2 className="pt-3 pb-2">알림</h2>
          <p className="pb-3">
            프로젝트 구인 사이트 개발' 프로젝트 신청이 수락되었습니다.
          </p>
          <hr className=" border-t-4" />
          <h2 className="pt-3 pb-2">알림</h2>
          <p className="pb-3">
            프로젝트 구인 사이트 개발 프로젝트의 ‘프론트엔드 개발자’로 참여 신청
            완료하였습니다.
          </p>
          <hr className=" border-t-4" />
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
