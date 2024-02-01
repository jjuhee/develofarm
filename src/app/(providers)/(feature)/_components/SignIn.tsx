"use client"

import { useCustomModal } from "@/hooks/useCustomModal"
import useUrlStore from "@/store/url"
import { supabaseForClient } from "@/supabase/supabase.client"
import Image from "next/image"
import React from "react"

const SignIn = () => {
  const url = useUrlStore((state) => state.url)
  const { openCustomModalHandler } = useCustomModal()

  const getGoogleSoicalLogin = async () => {
    try {
      await supabaseForClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: `http://localhost:3000${url}`,
        },
      })
    } catch (error) {
      openCustomModalHandler(`goolgleAuthFailed: ${error}`, "alert")
    }
  }

  const getKakaoSocialLogin = async () => {
    try {
      await supabaseForClient.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `http://localhost:3000${url}`,
        },
      })
    } catch (error) {
      openCustomModalHandler(`kakaoAuthFailed: ${error}`, "alert")
    }
  }

  const getGithubSocialLogin = async () => {
    try {
      await supabaseForClient.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `http://localhost:3000${url}`,
        },
      })
    } catch (error) {
      openCustomModalHandler(`githubAuthFailed: ${error}`, "alert")
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-[100px]">
        <section className="text-xl">
          <div className="text-center whitespace-pre-line font-bold">
            {`간편하게 로그인하고 
            당신의 꿈을 펼쳐보세요!`}
          </div>
        </section>
        <section className="flex flex-col items-center  box-sizing:inline">
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

export default SignIn
