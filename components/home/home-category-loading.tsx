import { Skeleton } from "../ui/skeleton";

interface HomeCategoryLoadingProps {
  isFirstItem: boolean;
  isLastItem: boolean;
}

const HomeCategoryLoading = ({
  isFirstItem,
  isLastItem,
}: HomeCategoryLoadingProps) => {
  return (
    <div
      className={`rounded-2xl ${isFirstItem ? "ml-2" : isLastItem ? "mr-2" : ""} flex-shrink-0`}
    >
      <Skeleton className="w-32 h-10 bg-gray-300" />
    </div>
  );
};

export default HomeCategoryLoading;
