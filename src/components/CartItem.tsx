import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/payload-types";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SheetTrigger } from "./ui/sheet";
import { PRODUCT_BRANDS } from "@/config";

const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0];

  const { removeItem } = useCart();

  const brand = PRODUCT_BRANDS.find(({ value }) => value === product.brand)
    ?.label;

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <SheetTrigger asChild>
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={image.url}
                    alt={`${product.name} product image`}
                    fill
                    className="absolute object-cover"
                  />
                </Link>
              </SheetTrigger>
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col self-start">
            <SheetTrigger asChild>
              <Link
                href={`/product/${product.id}`}
                className="line-clamp-1 text-sm font-semibold hover:text-gray-700"
              >
                {product.name}
              </Link>
            </SheetTrigger>
            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {brand}
            </span>

            <span className="line-clamp-1 text-sm font-medium">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          <button
            onClick={() => removeItem(product.id)}
            className="flex pt-1 items-center gap-0.5"
          >
            <X className="w-3 h-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
