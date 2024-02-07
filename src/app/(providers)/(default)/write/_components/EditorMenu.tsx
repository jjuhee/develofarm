import { Editor } from "@tiptap/react"
import { useRef, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { BsTypeBold, BsTypeUnderline } from "react-icons/bs"
import { BsTypeItalic } from "react-icons/bs"
import { BsTypeStrikethrough } from "react-icons/bs"
import { BsListUl } from "react-icons/bs"
import { BsListOl } from "react-icons/bs"
import { BsDash } from "react-icons/bs"
import { RiDoubleQuotesL } from "react-icons/ri"
import { BsCode } from "react-icons/bs"
import useOnClickOutSide from "@/hooks/useOnClickOutSide"

interface Props {
  editor: Editor
}

const EditorMenu = ({ editor }: Props) => {
  const dropdownRef = useRef<HTMLInputElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | null>("제목 1")

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

  useOnClickOutSide({ ref: dropdownRef, handler: () => setIsActive(false) })

  return (
    <div className="flex items-center gap-2">
      <div className="selectBox relative" ref={dropdownRef}>
        <div
          className={`flex items-center justify-center gap-2 my-auto border-[1px] border-white hover:border-[1px] hover:border-[#E6E6E6] rounded-[3px] w-[65px] h-[26px] leading-[26px] px-1 text-[12px] lg:w-[81px] lg:h-[33px] lg:leading-[33px] lg:text-[14px] cursor-pointer transition-all
          ${isActive ? "bg-[#E6E6E6]" : "bg-white"}`}
          onClick={() => setIsActive(!isActive)}
        >
          {
            <div className="h-[26px] lg:h-[33px]">
              {editor.isActive("heading", { level: 1 })
                ? "제목 1"
                : editor.isActive("heading", { level: 2 })
                  ? "제목 2"
                  : editor.isActive("heading", { level: 3 })
                    ? "제목 3"
                    : editor.isActive("paragraph")
                      ? "본문"
                      : selectedValue}
            </div>
          }
          {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <ul
          className={`absolute flex flex-col mt-[3px] rounded-lg border-[0.5px] *:w-[65px] *:h-[26px] *:leading-[26px] text-[12px] lg:*:w-[81px] lg:*:h-[29px] lg:*:leading-[29px] *:px-2 *:bg-white lg:text-[14px] z-10 ${
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
          size={33}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`edit-menu ${
            editor.isActive("bold") ? "bg-[#e6e6e6] border-[#e6e6e6]" : " "
          }`}
        />
        <BsTypeItalic
          size={33}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`edit-menu ${
            editor.isActive("italic") ? "bg-[#e6e6e6] border-[#e6e6e6]" : " "
          }`}
        />
        <BsTypeStrikethrough
          size={33}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`edit-menu ${
            editor.isActive("strike") ? "bg-[#e6e6e6] border-[#e6e6e6]" : " "
          }`}
        />
        <BsTypeUnderline
          size={33}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`edit-menu ${
            editor.isActive("underline") ? "bg-[#e6e6e6] border-[#e6e6e6]" : " "
          }`}
        />
        {/* TODO: (jhee) 글자 색상 추가 예정, 참고 용!! */}
        {/* <MdFormatColorText
        size={33}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" })
            ? "rounded border-solid border-2 bg-indigo-600 border-indigo-600"
            : "rounded border-solid border-2 border-indigo-600"
        }
      /> */}
        <BsListUl
          size={33}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`edit-menu ${
            editor.isActive("bulletList")
              ? "bg-[#e6e6e6] border-[#e6e6e6]"
              : " "
          }`}
        />
        <BsListOl
          size={33}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`edit-menu ${
            editor.isActive("orderedList")
              ? "bg-[#e6e6e6] border-[#e6e6e6]"
              : " "
          }`}
        />
        <RiDoubleQuotesL
          size={33}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`edit-menu ${
            editor.isActive("blockquote")
              ? "bg-[#e6e6e6] border-[#e6e6e6]"
              : " "
          }`}
        />
        <BsDash
          size={33}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="edit-menu"
        />
        <BsCode
          size={33}
          cursor={"pointer"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`edit-menu ${
            editor.isActive("codeBlock") ? "bg-[#e6e6e6] border-[#e6e6e6]" : " "
          }`}
        />
      </div>
    </div>
  )
}

export default EditorMenu
