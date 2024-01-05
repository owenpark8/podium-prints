"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-muted-foreground text-sm text-center">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        {/* TODO: Make email verified image
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/TODO.png" fill alt="email verified image" />
        </div>
        */}
        <h3 className="font-semibold text-2xl text-center">
          Your email has been verified!
        </h3>
        <Link
          className={buttonVariants({
            variant: "link",
            className: "text-center text-muted-foreground hover:no-underline",
          })}
          href="/signin"
        >
          Please continue to&nbsp;
          <span className="hover:underline hover:opacity-75 text-sky-500">
            sign in
          </span>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin h-8 w-8 text-zinc-400" />
        <h3 className="font-semibold text-xl">Verifying email...</h3>
        <p className="text-muted-foreground text-sm text-center">
          This should only take a moment
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
