import React from "react"

const Attatchment = () => {
  return (
    <div className="flex items-center border-[1px] border-black rounded-md h-[60px] pl-[9px]">
      <label className="flex justify-center gap-5">
        <div className="border-[1px] border-slate-800 rounded-md h-[37px] w-[151px] text-center leading-[37px]">
          사진 및 파일 첨부
        </div>
        <p className="leading-[37px] text-[#666666]">
          파일을 마우스로 끌어오세요.
        </p>
        <input type="file" className="hidden" />
      </label>
    </div>
  )
}

export default Attatchment
