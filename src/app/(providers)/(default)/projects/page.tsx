"use client"

import React, { useState } from "react"
import Spacer from "@/components/ui/Spacer"
import Category from "../write/_components/Category"
import ProjectList from "./_components/ProjectList"

const ProjectsPage = () => {
  /** 필터링 검색 옵션 */
  const [option, setOption] = useState<TProjectsOptions>({
    isOffline: null,
    startDate: "",
    endDate: "",
    regionId: "",
    techs: [],
  })

  /** 카테고리 초기값 설정 */
  const initialCategoryData: TCategoryData = {
    startDate: "",
    endDate: "",
    isOffline: null,
    region: null,
    numberOfMembers: 0,
    positions: [],
    techs: [],
  }

  const [categoryData, setCategoryData] =
    useState<TCategoryData>(initialCategoryData)

  return (
    <div>
      <Spacer y={60} />

      <Category
        categoryData={categoryData}
        isWritePage={false}
        setCategoryData={setCategoryData}
        setOption={setOption}
      />

      <Spacer y={30} />

      <ProjectList option={option as TProjectsOptions} />
    </div>
  )
}

export default ProjectsPage
