"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { editProfileSchema } from "@/lib/schemas";
import HeaderWithBack from "@/components/header-with-back-button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditProfile } from "@/hooks/useEditProfile";
import { showErrorToast, showSuccessToast } from "@/common/utils";
import { getMeAfterUpdateProfile } from "@/lib/api";
import { refreshSession } from "@/app/actions/refresh-session";

const EditProfile = () => {
  const session = useSession();

  console.log(JSON.stringify(session.data));

  const { mutate, isError, error, isSuccess, isPending } = useEditProfile();

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      updateSession();
    }
  }, [isSuccess]);

  const updateSession = async () => {
    try {
      const { data } = await getMeAfterUpdateProfile();

      await session.update({
        name: data.username,
        image: data.photoProfileUrl,
      });
      await refreshSession();
      showSuccessToast("Profile berhasil di-update");
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: session.data?.user.name ?? "",
      email: session.data?.user.email ?? "",
      image: undefined,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImagePicker = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      form.setValue("image", file);
      setPreview(imageUrl);
    }
  };

  function onSubmit(data: z.infer<typeof editProfileSchema>) {
    const formData = new FormData();

    formData.append("username", data.username);
    if (data.image) {
      formData.append("image", data.image);
    }

    mutate(formData);
  }

  return (
    <div className="w-full flex flex-col h-screen">
      <HeaderWithBack backTo="previous" title="Edit Profile" />

      <button
        className="w-full flex items-center justify-center mt-5 hover:cursor-pointer"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        <div className="relative">
          {preview ? (
            <Image
              unoptimized
              alt="photoProfile"
              className="w-24 h-24 rounded-full "
              height={0}
              src={preview}
              width={0}
            />
          ) : (
            <Image
              unoptimized
              alt="photoProfile"
              className="w-24 h-24 rounded-full "
              height={0}
              src={session.data?.user.image ?? ""}
              width={0}
            />
          )}

          <div className="absolute right-2 -bottom-2 p-1.5 rounded-full bg-curelean-50">
            <Camera className="text-neutral-10 w-4 h-4" />
            <input
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              type="file"
              onChange={handleImagePicker}
            />
          </div>
        </div>
      </button>

      {/* Form */}
      <Form {...form}>
        <form
          className="pt-3 pb-24 px-4 space-y-3"
          id="create-campaign-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username kamu..." {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email kamu..."
                    {...field}
                    disabled={true}
                  />
                </FormControl>
                <p className="text-neutral-50 text-xs">
                  Kamu tidak bisa mengubah email
                </p>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <Button className="bg-razmatazz-50 hover:bg-razmatazz-60 w-full text-neutral-0">
            {isPending ? "Loading..." : "Edit"}
          </Button>
        </form>
      </Form>
      {/* Form */}
    </div>
  );
};

export default EditProfile;
