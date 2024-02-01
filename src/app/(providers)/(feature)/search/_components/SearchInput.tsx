"use client"
import React from "react"
import { FaSearch } from "react-icons/fa"
import { HiOutlineXMark } from "react-icons/hi2"
interface SearchInputProps {
  onSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void
  text: string | undefined
  onRemoveTextHandler: () => void
  setText: (value: string) => void
}

const SearchInput = ({
  onSubmitHandler,
  text,
  onRemoveTextHandler,
  setText,
}: SearchInputProps) => {
  return (
    <div>
      <section className="flex justify-center align-center mt-40">
        <form onSubmit={onSubmitHandler} className="relative">
          <div className="relative flex items-center">
            <button type="submit" className="top-3">
              <FaSearch
                size={20}
                className="absolute left-3 top-4 text-gray-500 ml-3"
              />
            </button>
            <input
              className="p-3 pl-[60px] rounded-3xl border border-gray w-[800px] focus:border-transparent focus:ring-2 focus:ring-green-300 transition-all duration-300"
              type="text"
              name="search"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="검색어를 입력해주세요"
            ></input>
            {text ? (
              <span
                onClick={onRemoveTextHandler}
                className="absolute right-4 hover:cursor-pointer"
              >
                <HiOutlineXMark />
              </span>
            ) : (
              <></>
            )}
          </div>
        </form>
      </section>
    </div>
  )
}

export default SearchInput
