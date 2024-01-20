"use client"
import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import {
  BubbleMenu,
  EditorContentProps,
  EditorContentState,
} from "@tiptap/react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React, { RefObject, useEffect, useState } from "react"
import EditorMenu from "./EditorMenu"
import Spacer from "@/components/ui/Spacer"
import BubbleMenuButtons from "./BubbleMenuButtons"

interface Props {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

const TipTap = ({ content, setContent }: Props) => {
  console.log("tiptap", content)
  const editor = useEditor({
    extensions: extensions,
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none mx-auto focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      console.log("수정중이냐")
      setContent(editor.getHTML()) // onchange 같은 거라 계속저장하면 안되는 느낌 !
    },
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="border-y border-black">
        <Spacer y={10} />
        <EditorMenu editor={editor} />
        <Spacer y={10} />
      </div>
      <div className="py-10 px-5 min-h-[50vh]">
        <EditorContent editor={editor} />
      </div>
      <BubbleMenu editor={editor}>
        <BubbleMenuButtons editor={editor} />
      </BubbleMenu>
    </>
  )
}

export default TipTap

const extensions = [
  // TODO: (jhee) 모르겠는 extensions 설정 다시 확인
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
]
