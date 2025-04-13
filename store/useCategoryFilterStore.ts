import { create } from "zustand";

import { CategoryFilterState } from "@/common/interfaces";

export const useFilterCategoryStore = create<CategoryFilterState>((set) => ({
  category: undefined,
  setCategory: (category) => set(() => ({ category })),
}));
