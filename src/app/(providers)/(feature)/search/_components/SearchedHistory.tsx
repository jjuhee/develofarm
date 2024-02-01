import React from "react"
import { HiOutlineXMark } from "react-icons/hi2"

interface keywordsInterface {
  num: number
  text?: string
}

interface SearchedHistoryProps {
  onRemoveAllKeywordsHnalder: () => void
  keywords: keywordsInterface[] | undefined
  onSearchKeywordChangeHandler: (value: string) => void
  onRemoveEachKeywordHandler: (value: number) => void
}

const SearchedHistory = ({
  onRemoveAllKeywordsHnalder,
  keywords,
  onSearchKeywordChangeHandler,
  onRemoveEachKeywordHandler,
}: SearchedHistoryProps) => {
  return (
    <div>
      {" "}
      <section>
        <div className="flex justify-center items-center">
          <div className="flex justify-between mt-10 w-[500px]">
            <h2 className="font-bold text-gray-700">최근 검색어</h2>
            <button
              className="hover:font-bold "
              onClick={onRemoveAllKeywordsHnalder}
            >
              전체삭제
            </button>
          </div>
        </div>
        {/* 로컬스토리지에서도 제한을 둘것? */}
        <div className="flex justify-center mt-5 ">
          <ul className=" flex flex-row w-[50rem] justify-center items-center mt-2 gap-3">
            {keywords?.length ? (
              keywords.slice(0, 7).map((keyword) => (
                <div
                  className="bg-gray-200 rounded-3xl p-1 ml-2 relative hover:cursor-pointer "
                  onClick={() =>
                    onSearchKeywordChangeHandler(keyword.text as string)
                  }
                  key={keyword.text}
                >
                  <div className="bg-gray-200 rounded-3xl p-1 pr-2 ml-2 relative flex gap-1 items-center">
                    <span className="flex-grow whitespace-nowrap overflow-hidden">
                      {keyword.text}
                    </span>
                    <button
                      onClick={() => onRemoveEachKeywordHandler(keyword.num)}
                    >
                      <span>
                        <HiOutlineXMark />
                      </span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <>당신의 꿈을 펼쳐보세요!</>
            )}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default SearchedHistory
