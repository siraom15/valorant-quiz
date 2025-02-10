"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Credit from "@/components/ui/credit";
import ReactGA from "react-ga4";
import { useEffect } from "react";

// Initialize Google Analytics
ReactGA.initialize("G-79ZT1WDF38"); // Replace with your actual tracking ID

export default function Landing() {
  useEffect(() => {
    console.log("GA " + window.location.pathname + window.location.search);
    ReactGA.send("pageview");
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#ff4655] to-[#0f1923]">
      <div className="text-center space-y-8 max-w-md">
        {/* Valorant Logo */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <Image
            src="/vlr.png" // เพิ่มโลโก้ Valorant ในโฟลเดอร์ public
            alt="Valorant Logo"
            width={160}
            height={160}
            priority
            className="drop-shadow-glow animate-pulse"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white tracking-wider">
          คุณเป็นผู้เล่น Valorant แบบไหน? 🎯
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-200">
          มาค้นหาสไตล์การเล่นของคุณผ่านแบบทดสอบสุดป่วนนี้!
        </p>

        {/* Start Quiz Button */}
        <Link href="/quiz" className="block">
          <Button className="w-full bg-[#ff4655] hover:bg-[#ff5864] text-white py-6 text-xl font-bold tracking-wide transition-all duration-300 transform hover:scale-105">
            เริ่มทำแบบทดสอบ
          </Button>
        </Link>
        <Credit name="aommie 💔" link="https://github.com/siraom15" />
      </div>
    </div>
  );
}
