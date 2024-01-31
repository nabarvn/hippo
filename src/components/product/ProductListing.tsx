"use client";

import Link from "next/link";
import { Product } from "@/payload-types";
import { ImageSlider } from "@/components";
import { useEffect, useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import { ProductSkeleton } from "@/components/product";

interface ProductListingProps {
  index: number;
  product: Product | null;
}

const ProductListing = ({ index, product }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // for staggered animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductSkeleton />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[]; // we use `filter(Boolean)` to remove null or undefined values

  if (isVisible && product) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
      >
        <div className='flex flex-col w-full'>
          <ImageSlider urls={validUrls} />

          <h3 className='font-medium text-sm text-gray-700 mt-4'>
            {product.name}
          </h3>

          <p className='text-sm text-gray-500 mt-1'>{label}</p>

          <p className='font-medium text-sm text-gray-900 mt-1'>
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

export default ProductListing;
