import React, { useEffect } from "react"

interface Props {
  scrollYSize: number
  handler: (value: React.SetStateAction<boolean>) => void
}

/** 스크롤 이벤트 커스텀 훅
 * @param scrollYSize - 스크롤 사이즈
 * @param handler - 스크롤 이동 시 실행할 함수
 */
const useScrollEvent = ({ scrollYSize, handler }: Props) => {
  useEffect(() => {
    const handlerShowButton = () => {
      if (window.scrollY > scrollYSize) {
        handler(true)
      } else {
        handler(false)
      }
    }

    window.addEventListener("scroll", handlerShowButton)

    return () => {
      window.removeEventListener("scroll", handlerShowButton)
    }
  }, [])
}

export default useScrollEvent
