import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tigh sm:text-5xl">
            Your marketplace for high-quality motorsport artwork.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Podium Prints. Every graphic we sell has been digitally
            enhanced and carefully curated in order to provide the highest
            quality for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse All Products
            </Link>
          </div>
        </div>

        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          href="/products"
          title="Brand New"
        />
      </MaxWidthWrapper>

      {/*
    <section className='border-t border-gray-200 bg-gray-50'>
      <MaxWidthWrapper className='py-20'>
        <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
          
        </div>
      </MaxWidthWrapper>
    </section>
  */}
    </>
  );
}
