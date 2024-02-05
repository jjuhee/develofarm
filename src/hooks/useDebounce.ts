import { useState, useEffect } from "react"

interface Tdebouncing {
  enteredKeyword: string | undefined
}
// useDebounce 커스텀 훅
export const useDebounce = ({ enteredKeyword }: Tdebouncing, delay = 200) => {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(
    enteredKeyword,
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(enteredKeyword)
    }, delay)

    return () => clearTimeout(timer)
  }, [enteredKeyword, delay])

  return debouncedValue
}
