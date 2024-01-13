"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components";
import { Input } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const SignUpPage = () => {
  const form = useForm<TCredentialsValidator>({
    resolver: zodResolver(CredentialsValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }: TCredentialsValidator) => {
    // TODO: send data to the server
  };

  return (
    <>
      <div className='container relative flex flex-col items-center justify-center pt-20 lg:px-0'>
        <div className='mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-20 w-20' />

            <h1 className='text-2xl font-semibold tracking-tight'>
              Create an account
            </h1>

            <div className='flex gap-2'>
              <p className='self-center text-sm text-primary font-medium py-2'>
                Already have an account?
              </p>

              <Link
                href='/sign-in'
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "group gap-1 px-0"
                )}
              >
                Sign in
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

              <Button>Sign up</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
