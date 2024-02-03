"use client"
import React, { useEffect, useState, useRef } from "react"
import { getSearchedProject } from "../../(feature)/search/api"
import {
  InitialPageParam,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query"
import { getBookmarksByUserId } from "../../(default)/projects/api"
import { Tables } from "@/types/supabase"
import { supabaseForClient } from "@/supabase/supabase.client"
import Spacer from "@/components/ui/Spacer"
import SearchedProjectLists from "./_components/SearchedProjectLists"
import SearchInput from "./_components/SearchInput"
import SearchedHistory from "./_components/SearchedHistory"
import { useInView } from "react-intersection-observer"
import useKeywordsHooks from "@/hooks/useSearchHooks"
import useBookmarks from "@/hooks/useBookmarks"
import useUserStore from "@/store/user"
import { useDebounce } from "@/hooks/useDebounce"

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

const SearchPage = () => {
  const [currentUserId, setCurrentUserId] = useState("")
  const {
    setText,
    setKeywords,
    keywords,
    text,
    onRemoveEachKeywordHandler,
    onRemoveAllKeywordsHandler,
    onRemoveTextHandler,
    onSearchKeywordChangeHandler,
    onSubmitHandler,
    onKeypressHandler,
    enteredKeyword,
  } = useKeywordsHooks()
  /** 현재 인증된 유저 데이터 가져오기 */
  //zustand로 user 가져오기
  // useEffect(() => {
  //   const getAuth = async () => {
  //     const user = await supabaseForClient.auth.getUser()
  //     setCurrentUserId(user.data.user?.id as string)
  //   }
  //   getAuth()
  // }, [currentUserId])
  // const userId = useUserStore((state) => state.userId)
  // setCurrentUserId(userId)
  // console.log(
  //   "현재유저의 아이디 검색페이지",
  //   userId,
  //   "스테이트값의 유저",
  //   currentUserId,
  // )
  const bookmarks = useBookmarks(currentUserId)
  const debounceVal = useDebounce({ enteredKeyword })

  const {
    data: searchedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchedProjects", debounceVal],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      if (debounceVal) {
        return getSearchedProject(debounceVal, pageParam)
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, allPages: any) => {
      if ((lastPage as number) < 4) {
        console.log("lastPage!!!!!!!!", lastPage)
        return null
      }
      return allPages.length
    },
    select: (data: any) => {
      return data.pages
        .flatMap((page: any) => page)
        .filter((project: any) => project && project.id !== undefined)
    },
    enabled: !!debounceVal,
  })

  console.log("dddd", debounceVal)
  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return
      fetchNextPage()
    },
  })

  //1.들어오자마자 로컬 스토리지의 keywords의 값이 있는지 확인하고 , 있으면 keywods state에 값을 넣는다
  //2.keywords에 값이 있으면 map으로 돌려 ui에 보여준다
  //3.검색버튼 클릭시 localstorage에 추가되고 ,keywords state에도 추가된다.

  useEffect(() => {
    //window 객체가 완전히 불려진 상태에서 localstorage를 확인하는 조건문(처음에만 들어옴)
    if (typeof window !== "undefined") {
      //--만약 로컬스토리지에 keywords가 있다면 keywords state에 넣는다.
      if (localStorage.getItem("keywords")) {
        const result1 = localStorage.getItem("keywords")
        const json = JSON.parse(result1 as string)
        // setKeywords([json, ...keywords])
        setKeywords(json)

        //여기서 setKeywords를 해야하는데, 왜 자꾸 무한 loop됨?
      }
    }
  }, [])

  return (
    <div className="">
      <SearchInput
        onSubmitHandler={onSubmitHandler}
        text={text}
        onRemoveTextHandler={onRemoveTextHandler}
        setText={setText}
        onKeypressHandler={onKeypressHandler}
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
        searchedProjects={searchedData as Tables<"projects">[]}
        bookmarks={bookmarks as Tables<"bookmarks">[]}
        currentUser={currentUserId}
      />
      <div ref={ref} className="w-full h-[100px]"></div>
    </div>
  )
}

export default SearchPage
