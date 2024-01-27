import Link from "next/link";
import { Cart } from "@/components/cart";
import { getServerSideUser } from "@/lib/payload";
import { Icons, MaxWidthWrapper } from "@/components";
import { buttonVariants } from "@/components/ui/Button";
import { AccountMenu, NavItems } from "@/components/navigation";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const Navbar = async ({
  nextCookies,
}: {
  nextCookies: ReadonlyRequestCookies;
}) => {
  const { user } = await getServerSideUser(nextCookies);

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

              <div className='flex items-center ml-auto'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  {user ? null : (
                    <Link
                      href='/sign-in'
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span aria-hidden='true' className='h-6 w-px bg-gray-200' />
                  )}

                  {user ? (
                    <AccountMenu user={user} />
                  ) : (
                    <Link
                      href='/sign-up'
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Create account
                    </Link>
                  )}

                  {user ? (
                    <span aria-hidden='true' className='h-6 w-px bg-gray-200' />
                  ) : null}

                  {user ? null : (
                    <div className='flex lg:ml-6'>
                      <span
                        aria-hidden='true'
                        className='h-6 w-px bg-gray-200'
                      />
                    </div>
                  )}

                  <div className='flow-root ml-4 lg:ml-6'>
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
