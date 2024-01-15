import "./globals.css";
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
  return (
    <html lang='en' className='h-full'>
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className='relative flex flex-col min-h-screen'>
          <Providers>
            <Navbar />
            <div className='flex-grow flex-1'>{children}</div>
          </Providers>
        </main>

        <Toaster />
      </body>
    </html>
  );
}
