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
      <label className="flex items-center border-[1px] border-black rounded-md h-[60px] pl-[9px]">
        <div className="flex justify-center gap-5">
          <div className="border-[1px] border-slate-800 rounded-md h-[37px] w-[151px] text-center leading-[37px]">
            사진 및 파일 첨부
          </div>
        </div>
        <p className=" ml-1 leading-[37px] text-[#666666]">
          {fileInfo ? fileInfo : "파일을 마우스로 끌어오세요."}
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
