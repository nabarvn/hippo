import { MaxWidthWrapper } from "@/components";

const HomePage = () => {
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

          {/* TODO: render a button to browse trending products */}
        </div>

        {/* TODO: `ProductReel` goes here */}
      </MaxWidthWrapper>

      {/* TODO: section to display perks */}
    </>
  );
};

export default HomePage;
