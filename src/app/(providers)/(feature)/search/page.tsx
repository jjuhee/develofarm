"use client"
import React, { useEffect, useState } from "react"
import { getSearchedProject } from "../../(default)/projects/api"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getBookmarksByUserId } from "../../(default)/projects/api"
import { Tables } from "@/types/supabase"
import { supabaseForClient } from "@/supabase/supabase.client"
import Spacer from "@/components/ui/Spacer"
import SearchedProjectLists from "./_components/SearchedProjectLists"
import SearchInput from "./_components/SearchInput"
import SearchedHistory from "./_components/SearchedHistory"

//해당 이용자의 localstorage 가져오기
interface keywordsInterface {
  num: number
  text?: string
}
interface Props {
  project: Tables<"projects">
  bookmarks: Tables<"bookmarks">[]
  currentUser: string
}
//

const PAGE_SIZE = 5
const SearchPage = () => {
  const [currentUser, setCurrentUser] = useState("")

  /** 현재 인증된 유저 데이터 가져오기 */
  useEffect(() => {
    const getAuth = async () => {
      const user = await supabaseForClient.auth.getUser()
      setCurrentUser(user.data.user?.id as string)
    }
    getAuth()
  }, [currentUser])

  const [keywords, setKeywords] = useState<keywordsInterface[]>([])

  const [text, setText] = useState<string>()

  //북마크
  //currentUserId 와 같이 더 명확하게
  const { data: bookmarks } = useQuery<Tables<"bookmarks">[]>({
    queryKey: ["bookmarks", currentUser],
    queryFn: () => getBookmarksByUserId(currentUser),
    enabled: !!currentUser,
  })
  const { data: searchedData, refetch } = useQuery({
    queryKey: ["searchedProjects", text],
    queryFn: () => {
      if (text) {
        return getSearchedProject(text)
      }
    },
    enabled: false,
  })
  // const {data} =useInfiniteQuery({

  // })
  console.log("searchedData", searchedData)

  // ------PageCard--------------

  // ------PageCard--------------

  //1.들어오자마자 로컬 스토리지의 keywords의 값이 있는지 확인하고 , 있으면 keywods state에 값을 넣는다
  //2.keywords에 값이 있으면 map으로 돌려 ui에 보여준다
  //3.검색버튼 클릭시 localstorage에 추가되고 ,keywords state에도 추가된다.

  useEffect(() => {
    //window 객체가 완전히 불려진 상태에서 localstorage를 확인하는 조건문(처음에만 들어옴)
    if (typeof window !== "undefined") {
      //--만약 로컬스토리지에 keywords가 있다면 keywords state에 넣는다.
      if (localStorage.getItem("keywords")) {
        const result1: any = localStorage.getItem("keywords")
        const json = JSON.parse(result1)
        console.log("제이슨", json)
        // setKeywords([json, ...keywords])
        setKeywords(json)
        console.log(
          "새로고침하거나,새로들어오면 로컬스토리지에서 keywords를 state로 받아야한다?",
          keywords,
        )
        //여기서 setKeywords를 해야하는데, 왜 자꾸 무한 loop됨?
      }
    }
  }, [])

  //검색버튼 클릭하여 데이터(아이디,num,검색어) 추가
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("엔터시 여기로 들어오기", text)
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

    //화면에 보여지는 0~7중에 같은 검색어가 들어오면 검색 기록에 등재되지 않는다.
    const isKeywordExist = keywords
      .slice(0, 7)
      .some((keyword) => keyword.text === newKeyword.text)
    if (isKeywordExist) {
      setText(searchInput)
      refetch()
    } else {
      setKeywords([newKeyword, ...keywords])
      localStorage.setItem(
        "keywords",
        JSON.stringify([newKeyword, ...keywords]),
      )
      refetch()
    }
  }
  //검색어 추가

  // 단일 검색어 삭제
  const onRemoveEachKeywordHandler = (num: number) => {
    const nextKeyword = keywords?.filter((keyword) => {
      return keyword.num !== num
    })

    setKeywords(nextKeyword)
    localStorage.setItem("keywords", JSON.stringify(nextKeyword))
  }
  //검색어 기록  전체 삭제
  const onRemoveAllKeywordsHandler = () => {
    setKeywords([])
    localStorage.setItem("keywords", JSON.stringify([]))
  }

  // 검색어 삭제
  const onRemoveTextHandler = () => {
    setText("")
  }

  //검색기록 클릭시 해당 검색기록으로 검색창 텍스트 변환
  const onSearchKeywordChangeHandler = (text: string) => {
    setText(text)
  }

  console.log("data", searchedData)
  return (
    <div className="">
      <SearchInput
        onSubmitHandler={onSubmitHandler}
        text={text}
        onRemoveTextHandler={onRemoveTextHandler}
        setText={setText}
      />
      <SearchedHistory
        onRemoveAllKeywordsHnalder={onRemoveAllKeywordsHandler}
        keywords={keywords}
        onSearchKeywordChangeHandler={onSearchKeywordChangeHandler}
        onRemoveEachKeywordHandler={onRemoveEachKeywordHandler}
      />

      <Spacer y={70} />
      {/* -------프로젝트 리스트 들어오기 ---------- */}
      <SearchedProjectLists
        searchedProjects={searchedData}
        bookmarks={bookmarks}
        currentUser={currentUser}
      />
    </div>
  )
}

export default SearchPage
