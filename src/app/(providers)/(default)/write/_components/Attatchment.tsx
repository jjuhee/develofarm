import { useCustomModal } from "@/hooks/useCustomModal"
import React, { ChangeEvent, useState } from "react"

interface Props {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
}

const Attatchment = ({ setSelectedFile }: Props) => {
  const [fileInfo, setfileInfo] = useState("")
  const { openCustomModalHandler: customModal } = useCustomModal()
  const onUploadFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (!file) return
      if (!isImageFile(file)) {
        customModal("이미지 파일을 업로드 해주세요.", "alert")
        return
      }
      console.log("file info", file, file.name)
      setSelectedFile(file)
      setfileInfo(file.name)
    }
  }

  const isImageFile = (file: File) => file.type.includes("image")

  return (
    <>
      <label className="flex items-center gap-2 border-[1px] border-black rounded-md h-[40px] pl-[9px] mx-[20px] lg:h-[60px] lg:mx-0">
        <div className="flex justify-center">
          <div className="border-[1px] border-slate-800 rounded-md h-[28px] w-[103px] text-center leading-[28px] lg:leading-[37px] lg:h-[37px] lg:w-[151px]">
            사진 및 파일 첨부
          </div>
        </div>
        <p className=" ml-1 leading-[28px] text-[#666666] lg:leading-[37px]">
          {fileInfo ? fileInfo : "파일을 선택해주세요."}
        </p>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={onUploadFileHandler}
        />
      </label>
    </>
  )
}

export default Attatchment
