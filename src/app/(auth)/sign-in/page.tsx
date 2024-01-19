"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Icons } from "@/components";
import { Input } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/Button";

import {
  CredentialsValidator,
  TCredentialsValidator,
} from "@/lib/validators/credentials";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { toast } from "sonner";
import { ZodError } from "zod";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const origin = searchParams.get("origin");
  const isSeller = searchParams.get("as") === "seller";

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const form = useForm<TCredentialsValidator>({
    resolver: zodResolver(CredentialsValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: async () => {
      toast.success("Signed in successfully.");

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
    },

    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
  });

  const onSubmit = ({ email, password }: TCredentialsValidator) => {
    signIn({ email, password });
  };

  return (
    <>
      <div className='container relative flex flex-col items-center justify-center pt-20 lg:px-0'>
        <div className='mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-20 w-20' />

            <h1 className='text-2xl font-semibold tracking-tight'>
              Sign in to your {isSeller ? "seller" : ""} account
            </h1>

            <div className='flex gap-2'>
              <p className='self-center text-sm text-primary font-medium py-2'>
                New to Hippo?
              </p>

              <Link
                href='/sign-up'
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "group gap-1 px-0"
                )}
              >
                Sign up
                <ArrowRight className='h-3 w-3 group-hover:translate-x-1 transition' />
              </Link>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
              <FormField
                name='email'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input {...field} placeholder='you@example.com' />
                    </FormControl>

                    <FormMessage className='absolute text-xs -bottom-5' />
                  </FormItem>
                )}
              />

              <FormField
                name='password'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        placeholder='password'
                      />
                    </FormControl>

                    <FormMessage className='absolute text-xs -bottom-5' />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading}>Sign in</Button>
            </form>

            <div className='relative'>
              <div
                aria-hidden='true'
                className='absolute inset-0 flex items-center'
              >
                <span className='w-full border-t' />
              </div>

              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background text-muted-foreground px-2'>
                  or
                </span>
              </div>
            </div>

            {isSeller ? (
              <Button
                onClick={continueAsBuyer}
                variant='secondary'
                disabled={isLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant='secondary'
                disabled={isLoading}
              >
                Continue as seller
              </Button>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
