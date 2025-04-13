// import { Button } from "@heroui/button";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

import { useFilterCategoryStore } from "@/store/useCategoryFilterStore";
import { Category } from "@/common/interfaces";

interface HomeCategoryItemProps {
  isFirstItem: boolean;
  isLastItem: boolean;
  category: Category;
}

const HomeCategoryItem = ({
  isFirstItem,
  isLastItem,
  category,
}: HomeCategoryItemProps) => {
  const { setCategory } = useFilterCategoryStore();
  const router = useRouter();

  return (
    <Button
      className={`bg-neutral-0 border-curelean-50 border-[2px] text-curelean-50 rounded-2xl w-auto ${isFirstItem ? "ml-2" : isLastItem ? "mr-2" : ""} flex-shrink-0`}
      onClick={() => {
        setCategory(category);
        router.push("/campaign/list");
      }}
    >
      {category.name}
    </Button>
  );
};

export default HomeCategoryItem;
