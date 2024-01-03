import Link from "next/link";
import { Icons, MaxWidthWrapper, NavItems } from "@/components";

const Navbar = async () => {
  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              {/* TODO: `MobileNav` goes here */}

              <div className='flex ml-4 lg:ml-0'>
                <Link href='/'>
                  <Icons.logo className='h-10 w-10' />
                </Link>
              </div>

              <div className='hidden z-50 lg:block lg:self-stretch lg:ml-8'>
                <NavItems />
              </div>

              {/* TODO: display navigations */}
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
