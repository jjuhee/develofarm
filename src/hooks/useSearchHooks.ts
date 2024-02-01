import { useState } from "react"

interface keywordsInterface {
  num: number
  text?: string
}
const useSearchHooks = () => {
  const [keywords, setKeywords] = useState<keywordsInterface[]>([])
  const [text, setText] = useState<string>("")

  const onRemoveEachKeywordHandler = (num: number) => {
    const nextKeyword = keywords.filter((keyword, index) => index !== num)
    setKeywords(nextKeyword)
    localStorage.setItem("keywords", JSON.stringify(nextKeyword))
  }

  const onRemoveAllKeywordsHandler = () => {
    setKeywords([])
    localStorage.setItem("keywords", JSON.stringify([]))
  }

  const onRemoveTextHandler = () => {
    setText("")
  }

  const onSearchKeywordChangeHandler = (text: string) => {
    setText(text)
  }
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const searchInput: string = event.currentTarget.search.value
    if (searchInput === "") {
      alert("검색어를 입력해주세요")
      return
    }

    const newKeyword: keywordsInterface = {
      num: keywords.length,
      text: searchInput,
    }

    const isKeywordExist = keywords
      .slice(0, 7)
      .some((keyword) => keyword.text === newKeyword.text)
    if (isKeywordExist) {
      setText(searchInput)
    } else {
      setKeywords([newKeyword, ...keywords])
      localStorage.setItem(
        "keywords",
        JSON.stringify([newKeyword, ...keywords]),
      )
    }
  }
  return {
    setText,
    setKeywords,
    keywords,
    text,
    onRemoveEachKeywordHandler,
    onRemoveAllKeywordsHandler,
    onRemoveTextHandler,
    onSearchKeywordChangeHandler,
    onSubmitHandler,
  }
}

export default useSearchHooks
