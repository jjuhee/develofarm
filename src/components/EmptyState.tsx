import React from "react"

interface Props {
  title?: string
  subtitle?: string
}

const EmptyState = () => {
  return (
    <div>
      <h2>현재 데이터가 없습니다.</h2>
    </div>
  )
}

export default EmptyState
