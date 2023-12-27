import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { NAV_CATEGORIES, PRODUCT_CATEGORIES } from "@/config";

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const brand = parse(searchParams.brand);

  const label = NAV_CATEGORIES.find(({ value }) => value === brand)?.label;

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? "Browse high-quality artwork"}
        query={{
          brand,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
