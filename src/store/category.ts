import { create } from "zustand"

type TCategoryState = {
  title: string
  selectCategory: (title: string) => void
}

const useCategoryStore = create<TCategoryState>()((set) => ({
  title: "전체보기",
  selectCategory: (title: string) => set({ title: title }),
}))

export default useCategoryStore
