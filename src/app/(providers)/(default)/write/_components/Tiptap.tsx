"use client"
import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import { BubbleMenu } from "@tiptap/react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React, { useState } from "react"
import EditorMenu from "./EditorMenu"
import Spacer from "@/components/ui/Spacer"

const TipTap = () => {
  const [contents, setContents] = useState<String>("")
  const editor = useEditor({
    extensions: extensions,
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-sm lg:pose-sm   mx-auto focus:outline-none",
      },
    },
    //TODO : (jhee) onchange 뭔가 안됨!
    onUpdate({ editor }) {
      // onchange(editor.getHTML())
      // console.log(editor.getHTML())
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
      <div className="py-10 px-5">
        <EditorContent editor={editor} />
      </div>
      <BubbleMenu editor={editor}>
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

// TODO: (jhee) 삭제 예정, test용 content
const content = `
<h1>h1입니다</h1>
<h2>h2입니다</h2>
<h3>h1입니다</h3>
<h4>h2입니다</h4>
<p>저는 p인데요?</p>
<h5>h1입니다</h5>
<h6>h2입니다</h6>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`
