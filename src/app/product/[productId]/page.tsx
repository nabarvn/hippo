import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Check, Shield } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/config";
import { ProductReel } from "@/components/product";
import { AddToCartButton } from "@/components/cart";
import { getPayloadClient } from "@/payload-client";
import { MaxWidthWrapper, ImageSlider } from "@/components";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

const ProductPage = async ({ params: { productId } }: ProductPageProps) => {
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  // destructuring the first product from the array
  const [product] = products;

  // guard clause
  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[]; // we use `filter(Boolean)` to remove null or undefined values

  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
          {/* product details */}
          <div className='lg:max-w-lg lg:self-start'>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.id}>
                  <div className='flex items-center text-sm'>
                    <Link
                      href={breadcrumb.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'
                    >
                      {breadcrumb.name}
                    </Link>

                    {/* valid for all items except the last one */}
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        className='h-5 w-5 flex-shrink-0 text-gray-300 ml-2'
                      >
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {product.name}
              </h1>
            </div>

            <section className='mt-4'>
              <div className='flex items-center'>
                <p className='font-medium text-gray-900'>
                  {formatPrice(product.price)}
                </p>

                <div className='border-l text-muted-foreground border-gray-300 pl-4 ml-4'>
                  {label}
                </div>
              </div>

              <div className='space-y-6 mt-4'>
                <p className='text-base text-muted-foreground'>
                  {product.description}
                </p>
              </div>
            </section>
          </div>

          {/* product images */}
          <div className='lg:col-start-2 lg:row-span-2 lg:self-center mt-10 lg:mt-0'>
            <div className='aspect-square rounded-lg'>
              <ImageSlider urls={validUrls} />
            </div>
          </div>

          {/* add to cart */}
          <div className='lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-end mt-10'>
            <div>
              <div className='flex items-center text-sm mt-10'>
                <Check
                  aria-hidden='true'
                  className='h-5 w-5 flex-shrink-0 text-green-500'
                />

                <p className='text-muted-foreground ml-2'>
                  Eligible for instant delivery
                </p>
              </div>

              <div className='group inline-flex text-sm font-medium mt-2'>
                <Shield
                  aria-hidden='true'
                  className='h-5 w-5 flex-shrink-0 text-gray-400 mr-2'
                />

                <span className='text-muted-foreground hover:text-gray-700'>
                  30 Day Return Guarantee
                </span>
              </div>

              <div className='mt-6'>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href='/products'
        title={`Similar ${label}`}
        query={{ category: product.category, limit: 4 }}
        subtitle={`Browse similar premium ${label} just like '${product.name}'`}
      />
    </MaxWidthWrapper>
  );
};

export default ProductPage;
