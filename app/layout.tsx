import type { Metadata } from "next";
import { Noto_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  weight: "400",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "แบบทดสอบวาโรแร้นนนน",
  description: "มาค้นหาสไตล์การเล่น Valorant ของคุณผ่านแบบทดสอบสุดป่วนนี้! 🎯",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vlr-style.vercel.app/" />
        <meta property="og:title" content="แบบทดสอบวาโรแร้นนนน" />
        <meta
          property="og:description"
          content="มาค้นหาสไตล์การเล่น Valorant ของคุณผ่านแบบทดสอบสุดป่วนนี้! 🎯"
        />
        <meta
          property="og:image"
          content="https://vlr-style.vercel.app/page-preview.png"
        />
      </Head>
      <body className={notoSansThaiLooped.className}>{children}</body>
    </html>
  );
}
