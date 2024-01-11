import { Editor } from "@tiptap/react"
import { MdFormatBold } from "react-icons/md"
import { MdFormatItalic } from "react-icons/md"
import { MdFormatStrikethrough } from "react-icons/md"
import { MdFormatColorText } from "react-icons/md"
import { MdFormatClear } from "react-icons/md"
import { MdFormatListBulleted } from "react-icons/md"
import { MdFormatListNumbered } from "react-icons/md"
import { MdFormatQuote } from "react-icons/md"
import { MdHorizontalRule } from "react-icons/md"
import { MdCode } from "react-icons/md"
import { MdUndo } from "react-icons/md"
import { MdRedo } from "react-icons/md"

interface Props {
  editor: Editor
}

const EditorMenu = ({ editor }: Props) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap justify-items-start gap-1">
      {/* //TODO : (jhee) 
      1. h1~h6 select 버튼으로 구현 제목1,제목2,제목3...본문?
      2. write pages에 form으로 구조 만들고
      3.2.TODO: 가운데정렬, 글자 색상, 사진 입력 등등 추가.
      */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "w-[30px] h-[30px] rounded border-solid border-2  bg-black border-black text-white"
            : "w-[30px] h-[30px] rounded border-solid border-2 border-black"
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "w-[30px] h-[30px] rounded border-solid border-2  bg-black border-black text-white"
            : "w-[30px] h-[30px] rounded border-solid border-2 border-black"
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "w-[30px] h-[30px] rounded border-solid border-2  bg-black border-black text-white"
            : "w-[30px] h-[30px] rounded border-solid border-2 border-black"
        }
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? "w-[30px] h-[30px] rounded border-solid border-2  bg-black border-black text-white"
            : "w-[30px] h-[30px] rounded border-solid border-2 border-black"
        }
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? "w-[30px] h-[30px] rounded border-solid border-2  bg-black border-black text-white"
            : "w-[30px] h-[30px] rounded border-solid border-2 border-black"
        }
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? "w-[30px] h-[30px] rounded border-solid border-2  bg-black border-black text-white"
            : "w-[30px] h-[30px] rounded border-solid border-2 border-black"
        }
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph")
            ? "w-[30px] h-[30px] rounded border-solid border-2  bg-black border-black text-white"
            : "w-[30px] h-[30px] rounded border-solid border-2 border-black"
        }
      >
        P
      </button>

      <MdFormatBold
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        // disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "rounded border-solid border-2  bg-black border-black text-white"
            : "rounded border-solid border-2 border-black"
        }
      />
      <MdFormatItalic
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "rounded border-solid border-2  bg-black border-black text-white"
            : "rounded border-solid border-2 border-black"
        }
      />
      <MdFormatStrikethrough
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "rounded border-solid border-2  bg-black border-black text-white"
            : "rounded border-solid border-2 border-black"
        }
      />
      <MdFormatClear
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="rounded border-solid border-2 border-black"
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

      <MdFormatListBulleted
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "rounded border-solid border-2  bg-black border-black text-white"
            : "rounded border-solid border-2 border-black"
        }
      />
      <MdFormatListNumbered
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "rounded border-solid border-2 bg-black border-black text-white"
            : "rounded border-solid border-2 border-black"
        }
      />
      <MdFormatQuote
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? "rounded border-solid border-2 bg-black border-black text-white"
            : "rounded border-solid border-2 border-black"
        }
      />
      <MdHorizontalRule
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="rounded border-solid border-2 border-black"
      />
      <MdCode
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? "rounded border-solid border-2 bg-black border-black text-white"
            : "rounded border-solid border-2 border-black"
        }
      />
      <MdUndo
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="rounded border-solid border-2 border-black"
      />
      <MdRedo
        size={30}
        cursor={"pointer"}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="rounded border-solid border-2 border-black"
      />
    </div>
  )
}

export default EditorMenu
