import { useQuery } from "@tanstack/react-query";

import { CATEGORY } from "@/common/contants";
import { getCategories } from "@/lib/api";

export function useCategory() {
  return useQuery({
    queryKey: [CATEGORY],
    queryFn: getCategories,
    select: (response) => response.data,
  });
}
