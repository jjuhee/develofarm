import React from "react"
import Columns from "./Columns"
import { getSurfitCrawlingData } from "../api"

interface TSurfitArticles {
  description: string
  href: string
  imgSrc: string
  title: string
  now: string
}

const Column = async () => {
  const surfitArticles = await getSurfitCrawlingData()
  return (
    <>
      <Columns surfitArticles={surfitArticles as TSurfitArticles[]} />
    </>
  )
}
export default Column
