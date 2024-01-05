"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useCart } from "@/hooks/use-cart";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const RedirectPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const { clearCart } = useCart();

  useEffect(() => {
    if (origin?.startsWith("thank-you")) {
      clearCart();
    }
    const timeout = setTimeout(() => {
      origin ? router.replace(`/${origin}`) : router.push("/");
      router.refresh();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <p>Redirecting you to your destination...</p>
        <Loader2 className="m-2 w-4 h-4 animate-spin" />
        <div className="flex items-center">
          <p>
            If you are not automatically redirected,&nbsp;
            <a
              href={origin ? `/${origin}` : "/"}
              className="text-sky-500 hover:underline hover:opacity-75 font-normal text-base"
            >
              click this link
            </a>
            .
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default RedirectPage;
