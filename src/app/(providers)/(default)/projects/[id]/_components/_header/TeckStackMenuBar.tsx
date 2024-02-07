"use client"

import React, { useState } from "react"
import { getProjectTechWithPosition } from "../../api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { TProjectType } from "@/types/extendedType"

type Props = {
  children: string
  project: TProjectType
  job?: "프론트엔드" | "백엔드" | "디자인" | undefined
}

const TeckStackMenuBar = ({ children, project, job }: Props) => {
  const [isShow, setIsShow] = useState<React.SetStateAction<typeof job>>()

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
    job: "프론트엔드" | "백엔드" | "디자인" | undefined,
  ) => {
    setIsShow((prevJob: typeof job | undefined) =>
      prevJob === job ? undefined : job,
    )
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Image src={"/images/load.gif"} alt="load" width={200} height={200} />
      </div>
    )

  return (
    <div className="flex relative group">
      <button
        onMouseOver={() => toggleMenuHandler(job)}
        onMouseLeave={() => toggleMenuHandler(undefined)}
        className={
          "group cursor-default border-[2.5px] border-[#A6A6A6] rounded-lg px-4 py-1 ml-2 min-w-[130px] min-h-[45px] text-[#666666] font-semibold hover:border-[#000000] hover:text-[#000000] disabled:text-[#D2D2D2] disabled:border-[#D2D2D2]"
        }
        disabled={
          (children === "프론트엔드" && !prontEndTeck?.length) ||
          (children === "백엔드" && !backEndTeck?.length) ||
          (children === "디자인" && !designTeck?.length)
        }
      >
        {children}
      </button>
      {(children === "프론트엔드" && !prontEndTeck?.length) ||
        (children === "백엔드" && !backEndTeck?.length) ||
        (children === "디자인" && !designTeck?.length) || (
          <div
            className={
              "absolute hidden group-hover:block bg-[#B8FF65] text-[#000000] font-bold rounded-xl min-w-36 p-2 z-10  ml-2 shadow-lg after:content-[''] after:absolute after:top-[-8px] after:right-[55px] after:border-l-transparent after:border-l-[10px] after:border-r-[10px] after:border-r-transparent after:border-b-[10px] after:border-b-[#B8FF65] text-center mt-[65px] left-[5px]"
            }
          >
            {job === "프론트엔드" && (
              <>
                {prontEndTeck?.map((data) => (
                  <div key={data.tech_id}>{data.tech_name}</div>
                ))}
              </>
            )}
            {job === "백엔드" && (
              <>
                {backEndTeck?.map((data) => (
                  <div key={data.tech_id}>{data.tech_name}</div>
                ))}
              </>
            )}
            {job === "디자인" && (
              <>
                {designTeck?.map((data) => (
                  <div key={data.tech_id}>{data.tech_name}</div>
                ))}
              </>
            )}
          </div>
        )}
    </div>
  )
}

export default TeckStackMenuBar
