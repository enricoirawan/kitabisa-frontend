"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { SheetContent, SheetTitle, Sheet } from "../ui/sheet";

import category_outline from "@/public/icons/category_outline.svg";
import { useCategory } from "@/hooks/useCategory";
import { showErrorToast } from "@/common/utils";
import view_list from "@/public/icons/view_list.svg";
import { useFilterCategoryStore } from "@/store/useCategoryFilterStore";

const CategoryFilter = () => {
  const { category: selectedCategory, setCategory } = useFilterCategoryStore();
  const {
    data: categoryData,
    isPending: isFetchCategoryPending,
    isError: isFetchCategoryError,
    error: categoryError,
  } = useCategory();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isFetchCategoryError) {
      showErrorToast(categoryError.message);
    }
  }, [isFetchCategoryError]);

  return (
    <>
      <button
        className="w-full flex items-center justify-center space-x-2 p-2 border-b-2 border-r-2 border-neutral-20"
        onClick={() => setOpen(true)}
      >
        <Image alt="filter" src={category_outline} />
        <p className="text-sm font-semibold text-neutral-100">Kategori</p>
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          className="sm:w-full md:w-[450px] mx-auto rounded-t-md bg-neutral-0 px-4 space-y-3 pb-4 overflow-y-scroll max-h-screen"
          side="bottom"
        >
          <SheetTitle className="text-center">
            <p>Pilih Kategori Kampanye</p>
          </SheetTitle>
          {isFetchCategoryPending ? (
            <p>Sedang mengambil data...</p>
          ) : (
            <>
              {/* Drawer Body */}
              <div className="overflow-y-scroll h-[500px] space-y-2">
                <button
                  className="w-full flex flex-col space-y-3 items-stretch justify-start"
                  onClick={() => {
                    setCategory(undefined);
                    setOpen(false);
                  }}
                >
                  <div className="w-full flex items-center justify-between border-b border-neutral-20">
                    <div className="flex items-center justify-start space-x-2 pb-2">
                      <Image alt="icon" src={view_list} />
                      <p className="ont-semibold text-neutral-100">
                        Semua Kategori
                      </p>
                    </div>
                    {!selectedCategory && (
                      <div className="bg-curelean-50 h-2 w-2 rounded-full mr-1" />
                    )}
                  </div>
                </button>
                {categoryData?.map((category) => (
                  <button
                    key={category.id}
                    className="w-full flex flex-col space-y-3 items-stretch justify-start"
                    onClick={() => {
                      setCategory(category);
                      setOpen(false);
                    }}
                  >
                    <div className="w-full flex items-center justify-between border-b border-neutral-20">
                      <div className="flex items-center justify-startspace-x-2 pb-2">
                        <Image
                          alt="icon"
                          className="w-5 h-5"
                          height={0}
                          src={category.imageUrl}
                          width={0}
                        />
                        <p className="ont-semibold text-neutral-100">
                          {category.name}
                        </p>
                      </div>
                      {selectedCategory?.id === category.id && (
                        <div className="bg-curelean-50 h-2 w-2 rounded-full mr-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {/* Drawer Body */}
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CategoryFilter;
