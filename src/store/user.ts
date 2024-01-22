import { getUserId } from "@/app/(providers)/api"
import { create } from "zustand"

type TUserState = {
  userId: string
  setUserId: (user: string) => void
}

const useUserStore = create<TUserState>((set) => ({
  userId: "",
  setUserId: (userId) => set({ userId }),
}))

// useEffect 등을 사용하여 컴포넌트에서 필요한 타이밍에 getUser 호출 및 상태 업데이트 가능
getUserId().then((userId) => useUserStore.setState({ userId }))

export default useUserStore
