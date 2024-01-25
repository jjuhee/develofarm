"use client"
import React, { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { getSearchedProject } from "../../(default)/projects/api"
import { useQuery } from "@tanstack/react-query"
import ProjectCard from "../../(default)/projects/_components/ProjectCard"
import { getBookmarksByUserId } from "../../(default)/projects/api"
import { Tables } from "@/types/supabase"
import { supabaseForClient } from "@/supabase/supabase.client"
import { TProjectsType } from "@/types/extendedType"
import Spacer from "@/components/ui/Spacer"
import { HiOutlineXMark } from "react-icons/hi2"

//해당 이용자의 localstorage 가져오기
interface keywordsInterface {
  id?: number
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

  const initialCategoryData: TCategoryData = {
    startDate: "",
    endDate: "",
    isOffline: null,
    region: "",
    numberOfMembers: 0,
    positions: [],
    techs: [],
  }

  const [categoryData, setCategoryData] =
    useState<TCategoryData>(initialCategoryData)

  const [page, setPage] = useState<number>(1)

  const [recruitStatus, setRecruitStatus] = useState(false)

  const [order, setOrder] = useState(1)

  const [keywords, setKeywords] = useState<keywordsInterface[]>([])
  const [userId, setUserId] = useState<number>()
  const [text, setText] = useState<string>()

  //북마크
  const { data: bookmarks } = useQuery<Tables<"bookmarks">[]>({
    queryKey: ["bookmarks", currentUser],
    queryFn: () => getBookmarksByUserId(currentUser),
    enabled: !!currentUser,
  })

  //프로젝트 기술 스택
  /** 프로젝트 기술 스택 가져오기 */
  // const { data: techs } = useQuery({
  //   queryKey: ["techs", projectId],
  //   queryFn: () => getProjectTech(projectId),
  //   enabled: !!projectId,
  // })

  // ------PageCard--------------

  // ------PageCard--------------

  //1.들어오자마자 로컬 스토리지의 keywords의 값이 있는지 확인하고 , 있으면 keywods state에 값을 넣는다
  //2.keywords에 값이 있으면 map으로 돌려 ui에 보여준다
  //3.검색버튼 클릭시 localstorage에 추가되고 ,keywords state에도 추가된다.

  useEffect(() => {
    //window 객체가 완전히 불려진 상태에서 localstorage를 확인하는 조건문(처음에만 들어옴)
    if (typeof window !== "undefined") {
      //로그인한 이용자의 id 추출하여 keywods의 id 값으로 들어감-----
      const result2: any = localStorage.getItem(
        "sb-aksbymviolrkiainilpq-auth-token",
      )
      const user_id = JSON.parse(result2).user.id
      setUserId(user_id)
      //------------------------------

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
    event.preventDefault()

    const searchInput: string = event.currentTarget.search.value
    if (searchInput === "") {
      alert("검색어를 입력해주세요")
      return
    }

    const newKeyword: keywordsInterface = {
      id: userId,
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
  const onRemoveAllKeywordsHnalder = () => {
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

  const { data: searchedData, refetch } = useQuery({
    queryKey: ["searchedProjecs", text],
    queryFn: () => {
      if (text) {
        return getSearchedProject(text)
      }
    },
    enabled: false,
  })

  console.log("data", searchedData)
  return (
    <div className="h-[70vh]">
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
      <section>
        <div className="flex justify-center items-center">
          <div className="flex justify-between mt-10 w-[500px]">
            <h2 className="font-bold text-gray-700">최근 검색어</h2>
            <button
              className="hover:shadow-md hover:border-b rounded-xl "
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
                  key={keyword.id}
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

      <Spacer y={70} />
      {/* -------프로젝트 리스트 들어오기 ---------- */}
      {(searchedData?.length as number) > 0 ? (
        <ul className="flex flex-col gap-8">
          {searchedData?.map((item: Tables<"projects">) => {
            return (
              <ProjectCard
                key={item?.id}
                project={item as TProjectsType}
                bookmarks={bookmarks as Tables<"bookmarks">[]}
                currentUser={currentUser}
              />
            )
          })}
        </ul>
      ) : (
        <></>
        // <EmptyState />
      )}
    </div>
  )
}

export default SearchPage
