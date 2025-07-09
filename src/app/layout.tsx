import Preloader from "@/components/common/Preloader";
import Footer from "@/components/shared/Footer";
import TopHeader from "@/components/shared/TopHeader";
import Hydrate from "@/providers/Hydrate";
import NextuiProvider from "@/providers/NextuiProvider";
import StoreProvider from "@/providers/StoreProvider";
import { getGlobalData } from "@/utils/getGlobalData";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import React, { PropsWithChildren, Suspense } from "react";
import { GoogleTagManager } from "@next/third-parties/google";

// Import css
import "@/styles/globals.css";
import "animate.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AuthProvider from "@/providers/AuthProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/options";
import dynamic from "next/dynamic";
import Image from "next/image";

const PixelTracker = dynamic(() => import("@/components/PixelTracker"), {
  ssr: false,
});

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: PropsWithChildren<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="light">
      <head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '808370841507520');
              fbq('track', 'PageView');
            `,
          }}
        /> */}
        <meta
          name="facebook-domain-verification"
          content="83vc3686ftx65ctx5f80e4za7takbh"
        />
        <noscript>
          <Image
            alt="fb-pixel"
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=808370841507520&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <GoogleTagManager gtmId="GTM-W3XGQXZ2" />
      <body suppressHydrationWarning className={montserrat.className}>
        {/* <PixelTracker /> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3XGQXZ2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Hydrate>
          <NextTopLoader color="#134865" showSpinner={false} />
          <AuthProvider>
            <StoreProvider>
              <NextuiProvider>
                <TopHeader session={session ? session : null} />
                <Suspense fallback={<Preloader />}>
                  <main>{children}</main>
                </Suspense>
                <Footer />
              </NextuiProvider>
            </StoreProvider>
          </AuthProvider>
        </Hydrate>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalData();
  return {
    title: data?.shopName,
    description: data?.description || "",
    openGraph: {
      type: "website",
      title: data?.shopName || "",
      description: data?.description || "",
      images: [
        {
          url: data?.logo || "",
          alt: data?.shopName || "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.shopName || "",
      description: data?.description || "",
      creator: data?.shopName || "",
      images: [
        {
          url: data?.logo || "",
          alt: data?.shopName || "",
        },
      ],
    },
    keywords: [
      "online shopping",
      "buy online",
      "ecommerce",
      "best prices",
      "discounts",
      "free shipping",
      "deals",
      "shop now",
      "secure checkout",
      "sale",
      "new arrivals",
      "exclusive offers",
      "trending products",
      "customer reviews",
      "fast delivery",
      "fashion",
      "electronics",
      "home decor",
      "beauty products",
      "health and wellness",
      "gadgets",
      "accessories",
      "clothing",
      "footwear",
      "top brands",
      "gift ideas",
      "seasonal sales",
      "online deals",
      "limited-time offers",
      "shopping deals",
    ],
    creator: data?.shopName || "",
    icons: {
      icon: data?.logo || "",
      shortcut: data?.logo || "",
      apple: data?.logo || "",
    },
  };
}
