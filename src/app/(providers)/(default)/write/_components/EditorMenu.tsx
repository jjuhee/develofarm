import { Editor } from "@tiptap/react"
import { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { BsTypeBold, BsTypeUnderline } from "react-icons/bs"
import { BsTypeItalic } from "react-icons/bs"
import { BsTypeStrikethrough } from "react-icons/bs"
import { BsListUl } from "react-icons/bs"
import { BsListOl } from "react-icons/bs"
import { BsDash } from "react-icons/bs"
import { RiDoubleQuotesL } from "react-icons/ri"
import { BsCode } from "react-icons/bs"
import { MdUndo } from "react-icons/md"
import { MdRedo } from "react-icons/md"

interface Props {
  editor: Editor
}

const EditorMenu = ({ editor }: Props) => {
  const [isActive, setIsActive] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | null>("제목 1")

  const onClickFontSizeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.textContent) {
      setIsActive(!isActive)
    }
  }
  const setH1FontHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedValue(e.currentTarget.textContent)
    editor.chain().focus().toggleHeading({ level: 1 }).run()
    setIsActive(false)
  }
  const setH2FontHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedValue(e.currentTarget.textContent)
    editor.chain().focus().toggleHeading({ level: 2 }).run()
    setIsActive(false)
  }
  const setH3FontHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedValue(e.currentTarget.textContent)
    editor.chain().focus().toggleHeading({ level: 3 }).run()
    setIsActive(false)
  }
  const setParagraphFontHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedValue(e.currentTarget.textContent)
    editor.chain().focus().setParagraph().run()
    setIsActive(false)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="selectBox relative">
        <div
          className={`flex items-center justify-center my-auto border-[1px] rounded-[3px] w-[81px] h-[33px] leading-[33px] px-[7px] py-[8px] text-[14px] cursor-pointer transition-all
          ${isActive ? "bg-[#E6E6E6]" : "bg-white"}`}
          onClick={(e) => onClickFontSizeHandler(e)}
        >
          <div className="h-[33px]">{selectedValue}</div>
          {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <ul
          className={`absolute flex flex-col mt-[3px] rounded-lg border-[0.5px] *:w-[81px] *:h-[29px] *:leading-[29px] *:px-[7px] *:bg-white text-[14px] ${
            isActive ? "visible" : "invisible"
          }`}
        >
          <button
            type="button"
            className="rounded-t-lg hover:bg-[#E6E6E6]"
            onClick={setH1FontHandler}
          >
            제목 1
          </button>
          <button
            type="button"
            className="hover:bg-[#E6E6E6]"
            onClick={setH2FontHandler}
          >
            제목 2
          </button>
          <button
            type="button"
            className="hover:bg-[#E6E6E6]"
            onClick={setH3FontHandler}
          >
            제목 3
          </button>
          <button
            type="button"
            className="rounded-b-lg hover:bg-[#E6E6E6]"
            onClick={setParagraphFontHandler}
          >
            본문
          </button>
        </ul>
      </div>
      <div className="flex gap-2">
        <BsTypeBold
          size={30}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`category ${
            editor.isActive("bold") ? "bg-[#e6e6e6] border-[#e6e6e6]" : " "
          }`}
        />
        <BsTypeItalic
          size={30}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`category ${
            editor.isActive("italic") ? "bg-[#e6e6e6] border-[#e6e6e6]" : " "
          }`}
        />
        <BsTypeStrikethrough
          size={30}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`category ${
            editor.isActive("strike") ? "bg-[#e6e6e6] border-[#e6e6e6]" : " "
          }`}
        />
        <BsTypeUnderline
          size={30}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`category ${
            editor.isActive("underline") ? "bg-[#e6e6e6] border-[#e6e6e6]" : " "
          }`}
        />
        {/* TODO: (jhee) 글자 색상 추가 예정, 참고 용!! */}
        {/* <MdFormatColorText
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" })
            ? "rounded border-solid border-2 bg-indigo-600 border-indigo-600"
            : "rounded border-solid border-2 border-indigo-600"
        }
      /> */}
        <BsListUl
          size={30}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`category ${
            editor.isActive("bulletList")
              ? "bg-[#e6e6e6] border-[#e6e6e6]"
              : " "
          }`}
        />
        <BsListOl
          size={30}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`category ${
            editor.isActive("orderedList")
              ? "bg-[#e6e6e6] border-[#e6e6e6]"
              : " "
          }`}
        />
        <RiDoubleQuotesL
          size={30}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`category ${
            editor.isActive("blockquote")
              ? "bg-[#e6e6e6] border-[#e6e6e6]"
              : " "
          }`}
        />
        <BsDash
          size={30}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="category"
        />
        <BsCode
          size={30}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`category ${
            editor.isActive("codeBlock") ? "bg-[#e6e6e6] border-[#e6e6e6]" : " "
          }`}
        />
      </div>
    </div>
  )
}

export default EditorMenu
