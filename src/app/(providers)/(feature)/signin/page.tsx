"use client"
import { supabaseForClient } from "@/supabase/supabase.client"
import Image from "next/image"
import React from "react"
const page = () => {
  const getGoogleSoicalLogin = () => {
    const data = supabaseForClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })
    console.log("구글로그인 data", data)
  }
  const getKakaoSocialLogin = () => {
    const data = supabaseForClient.auth.signInWithOAuth({
      provider: "kakao",
    })
  }
  const getGithubSocialLogin = () => {
    const data = supabaseForClient.auth.signInWithOAuth({
      provider: "github",
    })
  }

  return (
    <>
      <div className="flex flex-col justfiy-center items-center my-40  ">
        <section className="text-xl">
          <div className="text-center font-bold">간편하게 로그인하고 </div>
          <div className="font-bold">당신의 꿈을 펼쳐보세요! </div>
        </section>
        <section className="flex flex-col justify-center items-center  box-sizing:inline">
          <div
            onClick={getGoogleSoicalLogin}
            className="flex items-center justify-center mx-4 my-1.5 border w-[16rem] text-center font-semibold cursor-pointer hover:border-#ccc p-2.5 mt-10 rounded-xl"
          >
            {" "}
            <Image
              src={"/images/google_logo.png"}
              alt="github_logo"
              width={25}
              height={25}
              className="mr-2"
            ></Image>
            구글 계정으로 로그인
          </div>
          <div
            onClick={getKakaoSocialLogin}
            className="flex items-center justify-center mx-4 my-1.5 border w-[16rem] text-center font-semibold cursor-pointer text-black bg-[#FEE500] hover:border-#ccc  p-2.5 rounded-xl"
          >
            <Image
              src={"/images/kakao_logo.png"}
              alt="github_logo"
              width={35}
              height={35}
              className="mr-2"
            ></Image>
            카카오 계정으로 로그인
          </div>
          <div
            onClick={getGithubSocialLogin}
            className=" flex items-center justify-center mx-4 my-1.5 border w-[16rem] text-center font-semibold cursor-pointer text-white bg-[#171515] hover:border-#ccc  p-2.5 rounded-xl"
          >
            <Image
              src={"/images/github_logo.png"}
              alt="github_logo"
              width={35}
              height={35}
              className="mr-2"
            ></Image>
            깃허브 계정으로 로그인
          </div>
        </section>
      </div>
    </>
  )
}

export default page
