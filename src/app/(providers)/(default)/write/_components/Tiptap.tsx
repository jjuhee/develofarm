"use client"
import Underline from "@tiptap/extension-underline"
import { BubbleMenu } from "@tiptap/react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"
import EditorMenu from "./EditorMenu"
import BubbleMenuButtons from "./BubbleMenuButtons"

interface Props {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

const TipTap = ({ content, setContent }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-m max-w-none mx-auto *:my-2 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML()) // TODO : onchange 같은 거라 계속저장하면 안되는 느낌!
    },
  })

  if (!editor) {
    return null
  }

  const onClickFocusHandler = () => {
    editor.commands.focus()
  }

  return (
    <>
      <div className="flex items-center relative border-b border-black h-[60px]">
        <EditorMenu editor={editor} />
      </div>
      <div className="py-10 px-5 min-h-[50vh]" onClick={onClickFocusHandler}>
        <EditorContent editor={editor} />
      </div>
      <BubbleMenu editor={editor}>
        <BubbleMenuButtons editor={editor} />
      </BubbleMenu>
    </>
  )
}

export default TipTap
