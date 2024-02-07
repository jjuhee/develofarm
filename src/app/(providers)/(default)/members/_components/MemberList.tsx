import React from "react"
import MemberCard from "./MemberCard"
import EmptyState from "@/components/EmptyState"

import type { TUsersType } from "@/types/extendedType"

interface Props {
  infinityUsers: TUsersType[]
}

const MemberList = ({ infinityUsers }: Props) => {
  return (
    <div className="w-full mt-7">
      <ul className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-4">
        {infinityUsers && infinityUsers.length > 0 ? (
          <>
            {infinityUsers.map((user: TUsersType, index: number) => (
              <MemberCard key={user?.id + index} user={user} />
            ))}
          </>
        ) : (
          <EmptyState />
        )}
      </ul>
    </div>
  )
}

export default MemberList
