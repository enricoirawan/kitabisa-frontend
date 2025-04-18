"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

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
import { showErrorToast } from "@/common/utils";

const formSchema = z.object({
  email: z
    .string({ message: "Email harus diisi" })
    .email({ message: "Email tidak valid" }),
  password: z.string({ message: "Password harus diisi" }),
});

const LoginClientPage = () => {
  const session = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: callbackUrl ?? "/",
    });

    if (response?.ok) {
      router.replace("/");
    }

    if (response?.error) {
      showErrorToast(response.error);
    }
  };

  useEffect(() => {
    if (session.data?.user) {
      router.replace("/");
    }
  }, []);

  return (
    <>
      <div className="text-neutral-100 w-full space-y-5">
        <section className="h-12 bg-curelean-50 flex items-center justify-start px-4 space-x-5">
          <Image
            alt="back"
            className="w-4 h-4 hover:cursor-pointer"
            src={arrow_circle_left_active}
            onClick={() => {
              if (callbackUrl) {
                router.back();
              } else {
                router.replace("/");
              }
            }}
          />
          <p className="text-neutral-0 font-semibold">Masuk</p>
        </section>

        <section className="px-4 space-y-5">
          <p className="font-semibold text-xl">
            Masuk untuk nikmati kemudahan berdonasi
          </p>

          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                className="bg-razmatazz-50 text-white w-full hover:bg-razmatazz-60"
                type="submit"
              >
                Masuk
              </Button>
            </form>
          </Form>
          <button
            className="w-full text-sm text-neutral-50 text-center"
            onClick={() => {
              router.push("/register");
            }}
          >
            Belum punya akun?{" "}
            <span className="font-semibold text-curelean-50">Daftar</span>{" "}
          </button>
        </section>

        <div className="h-2 w-full bg-neutral-10" />
      </div>
    </>
  );
};

export default LoginClientPage;
