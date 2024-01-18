import { getUserId } from "@/app/(providers)/api"
import { create } from "zustand"

type TUserState = {
  user: string | undefined
  setUser: (user: string | undefined) => void
}

const useUserStore = create<TUserState>((set) => ({
  user: "",
  setUser: (user) => set({ user }),
}))

// useEffect 등을 사용하여 컴포넌트에서 필요한 타이밍에 getUser 호출 및 상태 업데이트 가능
getUserId().then((user) => useUserStore.setState({ user }))

export default useUserStore
