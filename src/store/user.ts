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
  user: TUserData
  setUser: (user: TUserData) => void
}

const useUserStore = create<TUserState>((set) => ({
  userId: "",
  setUserId: (userId) => set({ userId }),
  user: {} as TUserData,
  setUser: (user: TUserData) => set({ user: user }),
}))

export default useUserStore
