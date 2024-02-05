"use client"
import React, { useState } from "react"
import Button from "./ui/Button"
import { useRouter } from "next/navigation"
import Image from "next/image"

const NotFoundButtons = () => {
  const router = useRouter()
  const [isLoading, setIsLoaing] = useState(false)

  const onClickHomeButton = () => {
    setIsLoaing(true)
    router.replace("/")
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh] w-screen absolute top-0 bg-white">
        <Image src={"/images/load.gif"} alt="load" width={200} height={200} />
      </div>
    )

  return (
    <div className="flex gap-[35px] *:w-[145px] *:h-[45px]">
      <Button type="border" text="이전으로" handler={() => router.back()} />
      <Button text="홈으로" handler={onClickHomeButton} />
    </div>
  )
}

export default NotFoundButtons
