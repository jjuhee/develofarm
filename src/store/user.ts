import { create } from "zustand"

export type TUserData = {
  id: string | null
  nickName: string | null
  avatarUrl: string | null
  email: string | null
  createdAt: string | null
}

type TUserState = {
  user: TUserData | null
  setUser: (user: TUserData | null) => void
}

const useUserStore = create<TUserState>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
}))

export default useUserStore
