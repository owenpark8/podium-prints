"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  TAuthCredientialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get("origin");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredientialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signInUser.useMutation({
    onSuccess: () => {
      toast.success("Signed in successfully");

      if (origin) {
        router.push(`/${origin}`);
        router.refresh();
        return;
      }

      router.push("/");
      router.refresh();
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error(
          "The email or password you entered does not match any of our records."
        );
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredientialsValidator) => {
    signIn({ email, password });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center-justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">
              {origin?.startsWith("thank-you")
                ? "Sign in to view your order"
                : origin?.startsWith("cart")
                  ? "Sign in to checkout"
                  : "Sign in to your account"}
            </h1>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    type="password"
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                  ) : null}
                  Sign in
                </Button>
              </div>
            </form>
          </div>
          <Link
            className={buttonVariants({
              variant: "link",
              className: "text-muted-foreground hover:no-underline",
            })}
            href="/signup"
          >
            Don&apos;t have an account?&nbsp;
            <span className="hover:underline hover:opacity-75 text-sky-500">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
