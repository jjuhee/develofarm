import React, { useEffect, useRef, useState } from "react"
import { getProjectTechWithPosition } from "../../api"
import { useQuery } from "@tanstack/react-query"
import { getProject } from "../../../api"

type Props = {
  children: string
  project: Exclude<Awaited<ReturnType<typeof getProject>>, null>
  job?: "프론트엔드" | "백엔드" | "디자이너" | undefined
}

const TeckStackMenuBar = ({ children, project, job }: Props) => {
  /**
   *@ param1 클릭하면 job이름에 따라서 열리고 닫힘
    @ param2 현재 가지고 있는 엘리먼트 */
  const [isShow, setIsShow] = useState<React.SetStateAction<typeof job>>()
  const menuRef = useRef<HTMLButtonElement>(null)

  /**
   *@ query 포지션이름과 기술이름 가공한 데이터 조회 */
  const { data, isLoading } = useQuery({
    queryKey: [project, { projectId: project.id }],
    queryFn: () => getProjectTechWithPosition(project.id),
  })

  const prontEndTeck = data?.filter(
    (data) => data.position_name === "프론트엔드",
  )
  const backEndTeck = data?.filter((data) => data.position_name === "백엔드")
  const designTeck = data?.filter((data) => data.position_name === "디자인")

  const toggleMenuHandler = (
    job: "프론트엔드" | "백엔드" | "디자이너" | undefined,
  ) => {
    setIsShow((prevJob: typeof job | undefined) =>
      prevJob === job ? undefined : job,
    )
  }

  /**
   *@ useEffect 버튼 외부 클릭 시 div태그 닫힘 */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof HTMLElement &&
        !menuRef.current.contains(event.target)
      ) {
        setIsShow(undefined)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  if (isLoading) return <div>isLoading...</div>
  return (
    <>
      <button
        onClick={() => toggleMenuHandler(job)}
        ref={menuRef}
        className={`border border-[#000000] rounded-lg px-4 py-1 ml-2 font-semibold min-w-[130px] min-h-[42px] disabled:bg-[#e6e6e6] disabled:border-none ${
          isShow === job && "border-2"
        }`}
        disabled={
          (job === "프론트엔드" && !prontEndTeck?.length) ||
          (job === "백엔드" && !backEndTeck?.length) ||
          (job === "디자이너" && !designTeck?.length)
        }
      >
        {children}
      </button>
      {isShow === job && (
        // TODO: css 간격 맞춰야함
        <div
          className={`absolute bg-[#B8FF65] text-[#000000] font-bold rounded-xl min-w-36 p-2 z-10 bottom-[250px] ml-2 shadow-lg after:content-[''] after:absolute after:top-[-8px] after:right-[75px] after:border-l-transparent after:border-l-[10px] after:border-r-[10px] after:border-r-transparent after:border-b-[10px] after:border-b-[#B8FF65] text-center ${
            isShow === "프론트엔드" && " left-[885px]"
          } ${isShow === "백엔드" && " left-[1020px]"} ${
            isShow === "디자이너" && " left-[1165px]"
          }`}
        >
          {isShow === "프론트엔드" && (
            <>
              {prontEndTeck?.map((data) => (
                <div key={data.tech_id}>{data.tech_name}</div>
              ))}
            </>
          )}
          {isShow === "백엔드" && (
            <>
              {backEndTeck?.map((data) => (
                <div key={data.tech_id}>{data.tech_name}</div>
              ))}
            </>
          )}
          {isShow === "디자이너" && (
            <>
              {designTeck?.map((data) => (
                <div key={data.tech_id}>{data.tech_name}</div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default TeckStackMenuBar
