import { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Hippo - Your destination for digital assets",
  description = "Hippo is an open-source marketplace for premium virtual goods.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false, // allow search engine bots to crawl and index the website
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@nabarvn",
    },
    icons,
    metadataBase: new URL("https://hippo.nabarun.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
