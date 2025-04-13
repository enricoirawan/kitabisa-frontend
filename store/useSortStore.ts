import { create } from "zustand";

import { SortState } from "@/common/interfaces";

export const useSortStore = create<SortState>((set) => ({
  sort: "desc",
  setSort: () =>
    set((state) => ({ sort: state.sort === "asc" ? "desc" : "asc" })),
}));
