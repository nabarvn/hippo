"use client";

import Link from "next/link";
import { User } from "@/payload-types";
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/use-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown";

import { Github, LayoutDashboard, LogOut } from "lucide-react";

const AccountMenu = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='overflow-visible'>
        <Button variant='ghost' size='sm' className='relative'>
          Account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-white w-60' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm text-black'>{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/sell'>
            <LayoutDashboard className='h-4 w-4 mr-2' />
            Seller Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link target='_blank' href='https://github.com/nabarvn/hippo'>
            <Github className='h-4 w-4 mr-2' />
            Star on GitHub
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut} className='cursor-pointer'>
          <LogOut className='h-4 w-4 mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
