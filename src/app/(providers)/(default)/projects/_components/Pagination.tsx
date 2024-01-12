"use client"

import React, { useState } from "react"
import Pagination from "@mui/material/Pagination"
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "../api"

interface Props {
  totalLength: number
}

const ProjectPagination = ({ totalLength }: Props) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const queryOption = {
    limit: pageSize + (page - 1) * pageSize,
    offset: (page - 1) * pageSize,
  }

  const { data } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => getProjects(queryOption),
  })

  const onClickPage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <>
      <Pagination
        page={page}
        count={Math.ceil(totalLength / 10)}
        shape="rounded"
        onChange={onClickPage}
      />
    </>
  )
}
export default ProjectPagination
