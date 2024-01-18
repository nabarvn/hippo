import Image from "next/image";
import { VerifyEmail } from "@/components";

interface VerifyEmailPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmailPage = ({ searchParams }: VerifyEmailPageProps) => {
  const token = searchParams.token;
  const toAddress = searchParams.to;

  return (
    <div className='container relative flex flex-col items-center justify-center pt-20 lg:px-0'>
      <div className='mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[350px]'>
        {token && typeof token === "string" ? (
          <div className='grid gap-6'>
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className='flex flex-col h-full items-center justify-center space-y-1'>
            <div className='relative h-60 w-60 text-muted-foreground mb-4'>
              <Image
                fill
                src='/hippo-email-sent.png'
                alt='hippo email sent image'
              />
            </div>

            <h3 className='font-semibold text-2xl'>Check your email</h3>

            {toAddress ? (
              <p className='text-muted-foreground text-center'>
                We&apos;ve sent a verification link to{" "}
                <span className='font-semibold'>{toAddress}</span>.
              </p>
            ) : (
              <p className='text-muted-foreground text-center'>
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
