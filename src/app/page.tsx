import Link from "next/link";
import { MaxWidthWrapper } from "@/components";
import { Button, buttonVariants } from "@/components/ui/Button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";

const HomePage = () => {
  const perks = [
    {
      name: "Instant Delivery",
      Icon: ArrowDownToLine,
      description:
        "Receive your assets via email within seconds and promptly download them.",
    },
    {
      name: "Guaranteed Quality",
      Icon: CheckCircle,
      description:
        "All assets featured on this platform undergo thorough verification by our team to ensure they meet the highest quality standards. Dissatisfied? Take advantage of our 30-day refund guarantee.",
    },
    {
      name: "For the Planet",
      Icon: Leaf,
      description:
        "We are committed to contributing 1% of our sales towards the conservation and revitalization of the natural environment.",
    },
  ];

  return (
    <>
      <MaxWidthWrapper>
        <div className='mx-auto text-center flex flex-col items-center max-w-3xl py-20'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Your marketplace for premium{" "}
            <span className='text-blue-600'>digital assets</span>.
          </h1>

          <p className='text-lg max-w-prose text-muted-foreground mt-6'>
            Welcome to Hippo. Every asset on this platform is verified by our
            team to uphold the highest quality standards.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link href='/products' className={buttonVariants()}>
              Browse Trending
            </Link>

            <Button variant='ghost'>Our quality promise &rarr;</Button>
          </div>
        </div>

        {/* TODO: `ProductReel` goes here */}
      </MaxWidthWrapper>

      <section className='border-t border-gray-200 bg-gray-50'>
        <MaxWidthWrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'
              >
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {perk.name}
                  </h3>

                  <p className='text-sm text-muted-foreground mt-3'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default HomePage;
