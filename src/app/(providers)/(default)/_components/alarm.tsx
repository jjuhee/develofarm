"use client"
import { supabaseForClient } from "@/supabase/supabase.client"
import React, { useState } from "react"

const Alarm = ({ children }: { children: React.ReactNode }) => {
  //   const [isAlarmData, setIsAlarmData] = useState<any>()
  //   const client = supabaseForClient

  //   const arr = []
  //   const channelA = client
  //     .channel("schema-db-changes")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "INSERT",
  //         schema: "public",
  //         table: "projects",
  //       },
  //       (payload) => setIsAlarmData(payload),
  //     )
  //     .subscribe()

  //   console.log("얍얍얍", isAlarmData)
  return (
    <div>
      <div></div>
      {children}
    </div>
  )
}

export default Alarm
