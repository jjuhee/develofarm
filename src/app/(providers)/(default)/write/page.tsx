"use client"
import Tiptap from "@/app/(providers)/(default)/write/_components/Tiptap"
import Spacer from "@/components/ui/Spacer"
import React, { useState } from "react"

const Write = () => {
  const [title, setTitle] = useState<string>()
  return (
    <div>
      {/* TODO : (jhee) 첨부파일 넣는 곳? */}
      <div className="flex flex-col mt-10 mb-10">
        <div className="flex">
          <input
            placeholder="제목을 작성하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="grow border-black border-solid border-2 rounded-md " //TODO : 얇게 어떻게 햐
          />
          <button className="w-40 rounded-full border-solid border-2 bg-black text-white">
            작성하기
          </button>
        </div>
      </div>
      {/* TODO: (jhee) 선택 박스 추가, 위아래 border */}
      <div className="border-solid border-y border-black">
        <Spacer y={30} />
        <button>선택</button>
        <button>버튼 투성이 으앙</button>
        <button>버튼</button>
        <Spacer y={30} />
      </div>
      <Spacer y={30} />
      <div className="border-solid border-b border-black">
        <Spacer y={20} />
        <Tiptap />
      </div>
    </div>
  )
}

export default Write
