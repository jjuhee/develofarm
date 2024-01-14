import React, { useEffect } from "react"

interface Props {
  ref: React.RefObject<HTMLInputElement>
  handler: () => void
}

const useOnClickOutSide = ({ ref, handler }: Props) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      // 모달 안 클릭 시
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return
      }

      // 모달 밖 클릭 시
      handler()
    }

    document.addEventListener("mousedown", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
    }
  }, [ref, handler])
}

export default useOnClickOutSide
