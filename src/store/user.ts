import { create } from "zustand"

export type TUserData = {
  id: string
  nickName: string
  avatarUrl: string
  email: string
  createdAt: string
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
