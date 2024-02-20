import { debounce } from "lodash"
import React, { useEffect, useState } from "react"

const useResizeDebounce = () => {
  const [windowSize, setWindowSize] = useState(
    typeof window !== "undefined"
      ? {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      : 0,
  )

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 200)

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowSize
}

export default useResizeDebounce
