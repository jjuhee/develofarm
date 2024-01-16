import { Editor } from "@tiptap/react"
import React from "react"

interface Props {
  editor: Editor
}

const BubbleMenuButtons = ({ editor }: Props) => {
  return (
    <div className="flex justify-center gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "rounded border-solid border-2 bg-black border-black text-white"
            : "rounded border-solid border-2 bg-white border-black"
        }
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "rounded border-solid border-2  bg-black border-black text-white"
            : "rounded border-solid border-2 bg-white border-black"
        }
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "rounded border-solid border-2  bg-black border-black text-white"
            : "rounded border-solid border-2 bg-white border-black"
        }
      >
        strike
      </button>
    </div>
  )
}

export default BubbleMenuButtons
