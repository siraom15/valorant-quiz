import type { Metadata } from "next";
import { Noto_Sans_Thai_Looped } from "next/font/google";
import "./globals.css";
import Credit from "@/components/ui/credit";

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
      <body className={notoSansThaiLooped.className}>
        {children}
      </body>
    </html>
  );
}
