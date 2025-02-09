"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "เมื่อเริ่มรอบใหม่ คุณมักจะซื้ออะไรเป็นอย่างแรก?",
    options: [
      { text: "Vandal / Phantom + Full Utility", type: "Team Player" },
      { text: "Sheriff / Frenzy เท่านั้น เซฟเงินไว้", type: "Eco Master" },
      { text: "Operator + Shield เต็ม", type: "Sniper" },
      { text: "ดรอปปืนให้เพื่อนก่อน ค่อยซื้อของตัวเอง", type: "Supporter" },
      { text: "Skin สวยไว้ก่อน อาวุธอะไรไม่เกี่ยง", type: "คนรวย" },
      { text: "เดิน Knife อย่างเดียว ประหยัดสุด", type: "Troller" },
    ],
  },
  {
    id: 2,
    question: "เมื่อเข้าไซต์แล้ว ทีมโดนยิงแตกหมด เหลือแค่คุณ 1v4 คุณจะทำอะไร?",
    options: [
      { text: "เล่นช้า ๆ หาจังหวะ Clutch", type: "Clutch God" },
      {
        text: "วิ่งออกไปยิงให้สุด ไม่ให้ศัตรูเก็บของฟรี",
        type: "Entry Fragger",
      },
      { text: "แอบหนีไปเซฟปืนรอบหน้า", type: "Smart Player" },
      { text: "พยายามกู้ระเบิดโดยไม่ให้ศัตรูรู้ตัว", type: "Ninja Defuser" },
      { text: 'นั่ง AFK พิมพ์ว่า "FF Next"', type: "Troller" },
      { text: "ดึงดาบ Inspect สกินให้สวยก่อนโดนยิง", type: "คนรวย" },
    ],
  },
  {
    id: 3,
    question: "เพื่อนขอดรอปปืน แต่คุณมีเงินพอดีซื้อให้ตัวเอง คุณจะ…",
    options: [
      { text: "ดรอปให้เพื่อนไปก่อน", type: "Supporter" },
      {
        text: "ซื้อ Bulldog ให้เพื่อน แต่เก็บเงินตัวเอง",
        type: "Smart Player",
      },
      { text: '"ไม่มีตังอะ Sheriff ไปก่อน"', type: "Eco Master" },
      { text: "ไม่ดรอป แต่ซื้อปืนแพงสุดของตัวเอง", type: "คนรวย" },
      { text: '"มีปืนก็ยิงเองสิวะ!"', type: "Entry Fragger" },
      { text: "ซื้อ Shorty ดรอปแล้วหัวเราะใส่", type: "Troller" },
    ],
  },
  {
    id: 4,
    question: "ถ้าคุณเป็น Duelist แล้วต้องเข้าไซต์ คุณจะ…",
    options: [
      { text: "เปิด Flash แล้ววิ่งบวก", type: "Entry Fragger" },
      { text: "รอให้เพื่อนเข้าไปก่อน แล้วตามไปเก็บตก", type: "Smart Player" },
      { text: "ไม่เข้า ใช้ปืนยิงจากระยะไกลพอ", type: "Sniper" },
      { text: "เข้าไปดูเชิงก่อน แล้วค่อยให้ทีมตามมา", type: "Team Player" },
      { text: "วิ่งเข้าหาแล้ว Inspect สกินก่อนยิง", type: "คนรวย" },
      { text: 'วิ่งไป Knife ศัตรูแล้วพิมพ์ "LOL"', type: "Troller" },
    ],
  },
  {
    id: 5,
    question: "เมื่อเหลือรอบสุดท้ายของเกม คุณมีเงิน 9,000 เครดิต คุณจะ…",
    options: [
      { text: "Full Buy + ดรอปให้เพื่อน", type: "Supporter" },
      { text: "ซื้อ Operator + Full Utility", type: "Sniper" },
      {
        text: "Sheriff / Frenzy เท่านั้น เผื่อเกมหน้า Overtime",
        type: "Eco Master",
      },
      { text: "ไม่สน ซื้อปืนแพงสุด + Melee สกินใหม่", type: "คนรวย" },
      { text: "รอให้เพื่อนซื้อก่อน แล้วค่อยเลือก", type: "Smart Player" },
      { text: 'ไม่ซื้ออะไร แล้วพิมพ์ "No Need Gun"', type: "Troller" },
    ],
  },
  {
    id: 6,
    question: "เมื่อทีมกำลังจะชนะ และคุณเหลือศัตรูคนสุดท้าย คุณจะ…",
    options: [
      { text: "บอกให้เพื่อนหยุดยิง เดี๋ยว Clutch เอง", type: "Clutch God" },
      { text: "วิ่งลุยเข้าไปก่อน ไม่ให้ศัตรูได้หายใจ", type: "Entry Fragger" },
      { text: "ถือปืนรอไกล ๆ ยิงจาก Safe Spot", type: "Sniper" },
      { text: "Flash ศัตรูแล้วให้เพื่อนยิงแทน", type: "Supporter" },
      { text: "เดิน Inspect สกินโชว์ แล้วกดยิงแค่รอบเดียว", type: "คนรวย" },
      { text: "วิ่งไป Knife ศัตรูให้ได้ก่อนจบเกม", type: "Troller" },
    ],
  },
];

const playerTypeDescriptions: Record<string, string> = {
  "Team Player":
    "คุณเป็นผู้เล่นที่คำนึงถึงทีมเป็นหลัก พร้อมปรับตัวเพื่อให้ทีมได้เปรียบ",
  "Eco Master":
    "คุณเป็นผู้เล่นที่เน้นการบริหารเครดิตอย่างคุ้มค่า และรู้จักการเซฟเงิน",
  Sniper: "คุณชอบการเล่นระยะไกล มีความแม่นยำสูง และชอบการควบคุมพื้นที่",
  Supporter: "คุณเป็นผู้เล่นที่คอยช่วยเหลือเพื่อนร่วมทีม และเสียสละเพื่อทีม",
  คนรวย: "คุณเป็นผู้เล่นที่รักความสวยงาม และพร้อมลงทุนกับเกม",
  Troller: "คุณเป็นผู้เล่นที่เน้นความสนุก บางครั้งอาจจะไม่จริงจังกับเกมมากนัก",
  "Clutch God":
    "คุณเป็นผู้เล่นที่มีความสามารถในการเอาชนะสถานการณ์ที่เสียเปรียบ",
  "Entry Fragger": "คุณเป็นผู้เล่นที่กล้าได้กล้าเสีย ชอบการเปิดเกม และนำทีม",
  "Smart Player":
    "คุณเป็นผู้เล่นที่มีไหวพริบ รู้จักการอ่านเกม และวางแผนการเล่น",
  "Ninja Defuser": "คุณเป็นผู้เล่นที่มีความแนบเนียน และชอบการเล่นแบบเงียบๆ",
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    const types = answers.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(types).sort((a, b) => b[1] - a[1])[0][0];
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const result = calculateResult();
    return (
      <div className="container mx-auto p-4  min-h-screen bg-gradient-to-b from-[#ff4655] to-[#0f1923]">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Image
              src="/vlr.png" // เพิ่มโลโก้ Valorant ในโฟลเดอร์ public
              alt="Valorant Logo"
              width={160}
              height={160}
              priority
              className="mx-auto"
            />
            <Separator />
            <CardTitle>ผลการทำแบบทดสอบ</CardTitle>
            <CardDescription>คุณเป็นผู้เล่นประเภท:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-bold text-center">{result}</h2>
            <p className="text-center">{playerTypeDescriptions[result]}</p>
            <Button
              className="w-full bg-[#ff4655] hover:bg-[#ff5864] text-white py-6 text-base font-bold tracking-wide transition-all duration-300 transform hover:scale-105"
              onClick={restartQuiz}
            >
              เริ่มทำแบบทดสอบใหม่
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 min-h-screen bg-gradient-to-b from-[#ff4655] to-[#0f1923] w-full">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          
          <CardTitle>
          <div className="w-full space-y-4">
            <Image
              src="/vlr.png" // เพิ่มโลโก้ Valorant ในโฟลเดอร์ public
              alt="Valorant Logo"
              width={160}
              height={160}
              priority
              className="mx-auto"
            />
            <Separator />
            <p>คุณเป็นผู้เล่น Valorant แบบไหน? 🎯🔥</p>
          </div>
            </CardTitle>
          <CardDescription>
            คำถามที่ {currentQuestion + 1} จาก {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress
            value={(currentQuestion / questions.length) * 100}
            className="mb-4"
          />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {questions[currentQuestion].question}
            </h3>
            <div className="grid gap-2">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4 text-left"
                  onClick={() => handleAnswer(option.type)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
