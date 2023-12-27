import Image from "next/image";

interface ProductImageProps {
  url: string;
}

const ProductImage = ({ url }: ProductImageProps) => {
  return (
    <div className="group relative bg-zing-100 aspect-square overflow">
      <Image
        fill
        loading="eager"
        className="-z-10 h-full w-full object-cover object-center rounded-lg"
        src={url}
        alt="Product image"
      />
    </div>
  );
};

export default ProductImage;
