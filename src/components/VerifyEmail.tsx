"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <XCircle className='h-8 w-8 text-red-600' />
        <h3 className='font-semibold text-xl'>There was a problem</h3>

        <p className='text-muted-foreground text-sm'>
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className='flex flex-col h-full items-center justify-center'>
        <div className='relative h-60 w-60 text-muted-foreground mb-4'>
          <Image
            fill
            src='/hippo-email-sent.png'
            alt='hippo email sent image'
          />
        </div>

        <h3 className='font-semibold text-2xl'>You&apos;re all set!</h3>

        <p className='text-muted-foreground text-center mt-1'>
          Thank you for verifying your email.
        </p>

        <Link href='/sign-in' className={cn(buttonVariants(), "mt-4")}>
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
        <h3 className='font-semibold text-xl'>Verifying...</h3>

        <p className='text-muted-foreground text-sm'>
          This won&apos;t take long.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
