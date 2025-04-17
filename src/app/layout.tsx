import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Script from "next/script";
import Providers from "./providers";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "미끼미끼",
  description: "낚시를 위한 종합 플랫폼",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const isLoggedIn = !!token;

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <Script
          src={"//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"}
          strategy="beforeInteractive"
        />
        <Header isLoggedIn={isLoggedIn} />
        <Providers>
          <main className="mt-[90px]">{children}</main>
          {isLoggedIn && <FloatingChatButton />}
        </Providers>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
