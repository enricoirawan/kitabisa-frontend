"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import arrow_circle_left_active from "@/public/icons/arrow_circle_left_active.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";
import { showErrorToast, showSuccessToast } from "@/common/utils";

const formSchema = z.object({
  username: z
    .string({ message: "Email harus diisi" })
    .min(6, { message: "Username minimal 6 karakter" }),
  email: z
    .string({ message: "Email harus diisi" })
    .email({ message: "Email tidak valid" }),
  password: z.string({ message: "Password harus diisi" }),
});

const Register = () => {
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError, error } = useRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast("Register berhasil, silahkan login.");
      router.replace("/login");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showErrorToast(error.message);
    }
  }, [isError]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(data);
    form.reset();
  }

  return (
    <div className="text-neutral-100 w-full space-y-5">
      <section className="h-12 bg-curelean-50 flex items-center justify-start px-4 space-x-5">
        <Image
          alt="back"
          className="w-4 h-4 hover:cursor-pointer"
          src={arrow_circle_left_active}
          onClick={() => router.back()}
        />
        <p className="text-neutral-0 font-semibold">Daftar</p>
      </section>

      <section className="px-4 space-y-2">
        <p className="font-semibold text-xl">
          Daftar untuk nikmati kemudahan berdonasi
        </p>

        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
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
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button
              className="bg-razmatazz-50 text-white w-full hover:bg-razmatazz-60"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Loading..." : "Daftar"}
            </Button>
          </form>
        </Form>
      </section>

      <div className="h-2 w-full bg-neutral-10" />
    </div>
  );
};

export default Register;
