import React from "react"

interface Props {
  title?: string
  subtitle?: string
}

const EmptyState = () => {
  return (
    <div>
      <h2>일치하는 게 없습니다.</h2>
    </div>
  )
}

export default EmptyState
