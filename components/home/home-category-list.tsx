"use client";

import { useEffect } from "react";

import HomeCategoryLoading from "./home-category-loading";
import HomeCategoryItem from "./home-category-item";

import { useCategory } from "@/hooks/useCategory";
import { showErrorToast } from "@/common/utils";
import { Category } from "@/common/interfaces";

const HomeCategoryList = () => {
  const { data, isPending, isError, error } = useCategory();

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  if (isPending) {
    return [1, 2, 3, 4, 5].map((item, index) => {
      const length = 5;

      return (
        <HomeCategoryLoading
          key={item}
          isFirstItem={index === 0}
          isLastItem={index === length - 1}
        />
      );
    });
  }

  return data?.map((category: Category, index: number) => {
    const length = data.length;

    return (
      <HomeCategoryItem
        key={category.id}
        category={category}
        isFirstItem={index === 0}
        isLastItem={index === length - 1}
      />
    );
  });
};

export default HomeCategoryList;
