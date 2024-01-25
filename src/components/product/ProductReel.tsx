"use client";

import Link from "next/link";
import { trpc } from "@/trpc/client";
import { Product } from "@/payload-types";
import { ProductListing } from "@/components/product";
import { TQueryValidator } from "@/lib/validators/query";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 5;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props;

  const { data: queryResults, isLoading } = trpc.getProducts.useInfiniteQuery(
    {
      query,
      limit: query.limit ?? FALLBACK_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const queriedProducts = queryResults?.pages.flatMap((page) => page.items);

  let displayedProducts: (Product | null)[] = [];

  if (queriedProducts && queriedProducts.length) {
    displayedProducts = queriedProducts;
  } else if (isLoading) {
    displayedProducts = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(
      null
    );
  }

  return (
    <section className='py-12'>
      <div className='md:flex md:items-center md:justify-between mb-4'>
        <div className='max-w-2xl lg:max-w-4xl px-4 lg:px-0'>
          {title ? (
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              {title}
            </h1>
          ) : null}

          {subtitle ? (
            <p className='text-sm text-muted-foreground mt-2'>{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block'
          >
            Shop the collection <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className='relative'>
        <div className='flex items-center w-full mt-6'>
          <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
            {displayedProducts.map((product, i) => (
              <ProductListing
                index={i}
                key={`product-${i}`}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
