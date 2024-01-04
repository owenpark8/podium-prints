import PaymentStatus from "@/components/PaymentStatus";
import { getPayloadClient } from "@/get-payload";
import { useCart } from "@/hooks/use-cart";
import { getServerSideUser } from "@/lib/payload-utils";
import { formatPrice } from "@/lib/utils";
import { Product, ProductFile, User } from "@/payload-types";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const { clearCart } = useCart();
  clearCart();

  const orderId = searchParams.orderId;

  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const payload = await getPayloadClient();
  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (orders.length === 0) {
    return noOrdersElement;
  }

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/signin?origin=thank-you?orderId=${order.id}`);
  }

  const products = order.products as Product[];

  const subtotal = products.reduce((total, product) => {
    return total + product.price;
  }, 0);
  const fee = 0;
  const shipping = 0;
  const total = subtotal + fee + shipping;

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you-1.webp"
          className="h-full w-full object-cover object-center"
          alt="thank you for your order"
        />
      </div>
      <div>
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 xl:gap-x-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-muted-foreground">
              Order successful
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Thanks for ordering!
            </h1>
            {order._isPaid ? (
              <p className="mt-2 text-base text-muted-foreground">
                Your order was processed and is available to download below.
                We&apos;ve sent your receipt and order details to{" "}
                <span className="font-medium text-gray-900">
                  {typeof order.user !== "string"
                    ? order.user.email
                    : "[USER EMAIL NOT FOUND]"}
                </span>
                .
              </p>
            ) : (
              <p className="mt-2 text-base text-muted-foreground">
                Your order is currently being processed. Please wait a moment.
              </p>
            )}
            <div className="mt-10 text-sm font-medium">
              <div className="text-muted-foreground">Order #</div>
              <div className="mt-1 text-gray-900">{order.id.toUpperCase()}</div>

              <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
                {products.map((product) => {
                  const downloadUrl = (product.product_file as ProductFile)
                    .url as string;

                  const { image } = product.images[0];
                  return (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <div className="relative h-24 w-24">
                        {typeof image !== "string" && image.url ? (
                          <Image
                            fill
                            src={image.url}
                            alt={`${product.name} product image`}
                            className="flex-none rounded-md bg-gray-100 object-cover object-center"
                          />
                        ) : null}
                      </div>
                      <div className="flex-auto flex flex-col">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {product.name}
                          </h3>
                        </div>
                        {order._isPaid ? (
                          <a
                            href={downloadUrl}
                            download={product.name}
                            className="flex items-center mt-2 text-blue-600 hover:underline underline-offset-2"
                          >
                            Download asset
                          </a>
                        ) : null}
                      </div>
                      <p className="flex-none font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className="space-y-3 border-t border-gray-200 pt-3 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-gray-900">{formatPrice(subtotal)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Transaction Fee</p>
                  <p className="text-gray-900">{formatPrice(fee)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="text-gray-900">N/A</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-gray-900">
                  <p className="text-base">Order Total</p>
                  <p className="text-base">{formatPrice(total)}</p>
                </div>
              </div>
              <PaymentStatus
                isPaid={order._isPaid}
                orderEmail={(order.user as User).email}
                orderId={order.id}
              />

              <div className="mt-10 border-t border-gray-200 py-6 text-right">
                <Link
                  href="/products"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Continue shopping &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const noOrdersElement = (
  <main className="flex flex-col items-center justify-center mt-8">
    <p className="text-sm font-medium text-muted-foreground">Error 404</p>
    <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
      Order not found.
    </h1>
  </main>
);

export default ThankYouPage;
