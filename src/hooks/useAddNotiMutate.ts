import { addNotification } from "@/app/(providers)/(default)/members/api"
import { TablesInsert } from "@/types/supabase"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"

const useAddNotiMutate = () => {
  const queryClient = useQueryClient()

  const { mutate: addNotiMutate } = useMutation<
    unknown,
    Error,
    TablesInsert<"notifications">
  >({
    mutationFn: addNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitations"],
      })
    },
  })

  return addNotiMutate
}

export default useAddNotiMutate
