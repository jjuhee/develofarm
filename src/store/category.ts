import { create } from "zustand"

type TCategoryState = {
  category: string
  selectCategory: (category: string) => void
}

const useCategoryStore = create<TCategoryState>()((set) => ({
  category: "전체보기",
  selectCategory: (category: string) => set({ category: category }),
}))

export default useCategoryStore
