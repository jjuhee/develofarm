import ProjectCard from "@/app/(providers)/(default)/projects/_components/ProjectCard"
import { TProjectsType } from "@/types/extendedType"
import { Tables } from "@/types/supabase"
import { useInfiniteQuery } from "@tanstack/react-query"
import React from "react"

interface Props {
  searchedProjects: Tables<"projects">[] // searchedData의 타입을 Tables<"projects">[]로 수정
  bookmarks: Tables<"bookmarks">[]
  currentUser: string
}

//
const SearchedProjectLists = ({
  searchedProjects,
  bookmarks,
  currentUser,
}: Props) => {
  return (
    <div>
      {searchedProjects &&
      Array.isArray(searchedProjects) &&
      searchedProjects.length > 0 ? (
        <ul className="flex flex-col gap-8">
          {searchedProjects.map((item: Tables<"projects">) => (
            <ProjectCard
              key={item?.id}
              project={item as TProjectsType}
              bookmarks={bookmarks}
              currentUser={currentUser}
            />
          ))}
        </ul>
      ) : (
        <div className="mt-5">
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default SearchedProjectLists
