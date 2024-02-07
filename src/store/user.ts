import { TUserData } from "@/types/users"
import { create } from "zustand"

type TUserState = {
  user: TUserData | null
  setUser: (user: TUserData | null) => void
}

const useUserStore = create<TUserState>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
}))

export default useUserStore
