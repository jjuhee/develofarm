import useUserStore from "@/store/user"
import { createContext, useContext, useEffect, useState } from "react"
import { getProject } from "../../../api"
import { useParams } from "next/navigation"

type TProjectDetail = {
  isWriter: boolean
}

const ProjectDetailContext = createContext<TProjectDetail>({
  isWriter: false,
})

export function ProjdectDetailProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isWriter, setIsWriter] = useState(false)
  const { id } = useParams<{ id: string }>()
  const user = useUserStore()
  const project = getProject(id)

  const value: TProjectDetail = {
    isWriter,
  }

  useEffect(() => {
    if (user) {
      // setIsWriter(user ===)
    }
  })
}
