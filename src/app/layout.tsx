import "./globals.css";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui";
import { Navbar, Providers } from "@/components";
import { cn, constructMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();

  return (
    <html lang='en' className='h-full'>
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className='relative flex flex-col min-h-screen'>
          <Providers>
            <Navbar nextCookies={nextCookies} />
            <div className='flex-grow flex-1'>{children}</div>
          </Providers>
        </main>

        <Toaster position='top-center' richColors />
      </body>
    </html>
  );
}
