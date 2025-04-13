"use client";

import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatDateForAPI,
  formatDateForView,
  formatRupiah,
  showErrorToast,
  showSuccessToast,
} from "@/common/utils";
import { useCategory } from "@/hooks/useCategory";
import HeaderWithBack from "@/components/header-with-back-button";
import { useCreateCampaign } from "@/hooks/useCreateCampaign";
import { getQueryClient } from "@/app/query-provider";
import { NEWEST_CAMPAIGNS_KEY } from "@/common/contants";
import { createCampaignSchema } from "@/lib/schemas";

const CreateCampaign = () => {
  const router = useRouter();
  const { data } = useSession();

  const { mutate, isError, error, isSuccess } = useCreateCampaign();
  const {
    data: categoryData,
    isPending: isFetchCategoryPending,
    isError: isFetchCategoryError,
    error: categoryError,
  } = useCategory();

  const form = useForm<z.infer<typeof createCampaignSchema>>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      headline: "",
      description: "",
      categoryId: "",
      dueTo: new Date(),
      targetFunding: 0,
      image: undefined,
    },
  });

  const [formattedNominal, setFormattedRupiah] = useState<string>("");
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setFormattedRupiah("");
      setPreviewBanner(null);
      showSuccessToast("Kampanye berhasil dibuat.");

      getQueryClient().invalidateQueries({ queryKey: [NEWEST_CAMPAIGNS_KEY] });
      router.push(`profile/${data?.user.name}/campaign`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  useEffect(() => {
    if (isFetchCategoryError) {
      showErrorToast(categoryError.message);
    }
  }, [isFetchCategoryError]);

  function onSubmit(data: z.infer<typeof createCampaignSchema>) {
    const formData = new FormData();

    formData.append("headline", data.headline);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);
    formData.append("targetFunding", data.targetFunding.toString());
    formData.append("dueTo", formatDateForAPI(data.dueTo));
    formData.append("image", data.image);

    mutate(formData);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null; // Pastikan file tidak null

    setPreviewBanner(file ? URL.createObjectURL(file) : null);
    form.setValue("image", file!); // Simpan file ke react-hook-form
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-scroll">
      {/* Header */}
      <HeaderWithBack backTo="previous" title="Buat Kampanye" />
      {/* Header */}

      {/* Form */}
      <Form {...form}>
        <form
          className="pt-3 pb-24 px-4 space-y-3"
          id="create-campaign-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="headline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headline</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Headline harus menjelaskan gambaran singkat kampanye"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Kampanye</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Deksripsi harus menjelaskan gambaran lengkap kampanye"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            disabled={isFetchCategoryPending}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl className="w-full border border-solid border-gray-300 rounded-md px-3 py-1 text-base shadow-sm">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori kampanye" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-neutral-0">
                    {categoryData?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        <div className="flex items-center justify-between px-1 space-x-5">
                          <Image
                            alt="category"
                            className="w-4 h-4"
                            height={0}
                            src={category.imageUrl}
                            width={0}
                          />
                          <p>{category.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetFunding"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <p className="mb-2 font-semibold text-sm">
                      Target Kampanye
                    </p>
                    <div className="border border-solid border-gray-300 rounded-md p-4 flex items-center justify-between">
                      <p className="text-2xl font-semibold text-neutral-100">
                        Rp
                      </p>
                      <Input
                        placeholder="0"
                        {...field}
                        className="border-none shadow-none !text-3xl text-end"
                        value={formattedNominal}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, ""); // Hanya angka

                          setFormattedRupiah(
                            rawValue ? formatRupiah(Number(rawValue)) : "",
                          ); // Set format tampilan
                          form.setValue("targetFunding", Number(rawValue)); // Simpan angka asli di form
                        }}
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueTo"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Selesai Kampanye</FormLabel>
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          "border border-solid border-gray-300 rounded-md p-4",
                          !field.value && "text-muted-foreground",
                        )}
                        variant={"outline"}
                      >
                        {field.value ? (
                          formatDateForView(field.value)
                        ) : (
                          <span className="text-neutral-30">Pilih Tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <Calendar
                      initialFocus
                      classNames={{
                        root: "bg-neutral-0",
                        day_selected:
                          "bg-curelean-50 rounded-full text-neutral-0 hover:bg-curelean-30",
                      }}
                      disabled={{ before: new Date() }}
                      locale={id}
                      mode="single"
                      selected={field.value}
                      onDayClick={() => {
                        setOpenCalendar(false);
                      }}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Banner Kampanye</FormLabel>
                <FormControl>
                  <Input
                    accept="image/png, image/jpeg, image/jpg"
                    placeholder="Pilih banner"
                    type="file"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {previewBanner && (
            <div className="mt-2">
              <Image
                alt="Preview"
                className="rounded-lg border"
                height={200}
                src={previewBanner}
                width={200}
              />
            </div>
          )}
        </form>
      </Form>

      {/* Form */}
    </div>
  );
};

export default CreateCampaign;
