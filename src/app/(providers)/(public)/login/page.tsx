"use client"
import { supabaseForClient } from "@/supabase/supabase.client"
import React from "react"

const page = () => {
  const getSocialGoogleSoicalLogin = () => {
    const data = supabaseForClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })
  }

  return (
    <>
      <div>
        <section className="flex flex-col justify-center items-center h-screen w-screen border">
          <div
            onClick={getSocialGoogleSoicalLogin}
            className="mx-4 my-4 border w-60 text-center cursor-pointer hover:border-black "
          >
            구글 로그인
          </div>
          <div className="mx-4 my-4 border w-60 text-center cursor-pointer hover:border-black">
            카카오 로그인
          </div>
          <div className="mx-4 my-4 border w-60 text-center cursor-pointer hover:border-black">
            깃허브 로그인
          </div>
        </section>
      </div>
    </>
  )
}

export default page
