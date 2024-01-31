import { create } from "zustand"

type TUserData = {
  id: string
  nickName: string
  avatarUrl: string
  email: string
  createdAt: string
}

type TUserState = {
  userId: string
  setUserId: (userId: string) => void
  user: TUserData | null
  setUser: (user: TUserData | null) => void
}

const useUserStore = create<TUserState>((set) => ({
  userId: "",
  setUserId: (userId) => set({ userId }),
  user: null,
  setUser: (user) => set({ user: user }),
}))

export default useUserStore
