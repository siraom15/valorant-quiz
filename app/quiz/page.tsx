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
      { text: '"ไม่ดรอป เพราะมึงเล่นไม่เป็น"', type: "Toxic Player" },
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
  {
    id: 7,
    question: "เมื่อทีมแพ้ 0-3 คุณจะ...",
    options: [
      { text: "พยายามให้กำลังใจทีม 'ไม่เป็นไร สู้ต่อ!'", type: "Team Player" },
      { text: "เงียบแล้วเล่นต่อไป", type: "Smart Player" },
      { text: 'พิมพ์ "gg" ทุกรอบที่แพ้', type: "Toxic Player" },
      { text: "บอกว่าแพ้เพราะสกินไม่สวยพอ", type: "คนรวย" },
      { text: "ขอ FF เลย ไม่ต้องเสียเวลา", type: "Troller" },
      { text: "บอกว่าเดี๋ยว Comeback เอง", type: "Clutch God" },
    ],
  },
  {
    id: 8,
    question: "เมื่อเพื่อนในทีมเล่นพลาด คุณจะ...",
    options: [
      { text: "ให้กำลังใจ 'ไม่เป็นไร เดี๋ยวเอาคืน'", type: "Team Player" },
      { text: "เงียบไว้ดีที่สุด", type: "Smart Player" },
      { text: 'พิมพ์ "Jett diff" ในแชททีม', type: "Toxic Player" },
      { text: "แนะนำวิธีการเล่นที่ถูกต้อง", type: "Supporter" },
      { text: "บอกให้ซื้อสกินใหม่จะได้เล่นดีขึ้น", type: "คนรวย" },
      { text: "หัวเราะใส่ไมค์เสียงดังๆ", type: "Troller" },
    ],
  },
  {
    id: 9,
    question: "ถ้าเจอคนเล่นดีกว่าในทีมตรงข้าม คุณจะ...",
    options: [
      { text: "ชมว่าเขาเล่นเก่งจริงๆ", type: "Team Player" },
      { text: "รายงานเผื่อเขาโกง", type: "Toxic Player" },
      { text: "พยายามหาทางเอาชนะให้ได้", type: "Clutch God" },
      { text: "หลบไม่เผชิญหน้าด้วย", type: "Smart Player" },
      { text: "ท้า 1v1 หลังจบเกม", type: "Entry Fragger" },
      { text: "บอกว่าเขาเล่นดีเพราะมีสกินเท่านั้น", type: "คนรวย" },
    ],
  },
  {
    id: 10,
    question: "เมื่อมีคนเลือก Agent ที่คุณต้องการก่อน คุณจะ...",
    options: [
      { text: "เลือก Agent อื่นที่ทีมต้องการ", type: "Team Player" },
      { text: "ด่าแล้ว Lock Jett ซ้ำ", type: "Toxic Player" },
      { text: "เลือก Agent ที่ Counter ทีมตัวเอง", type: "Troller" },
      { text: "ขอแลกโดยบอกว่าคุณเล่นเก่งกว่า", type: "Entry Fragger" },
      { text: "เลือก Agent ที่มีสกินสวยที่สุด", type: "คนรวย" },
      { text: "รอดูว่าทีมขาดอะไรแล้วค่อยเลือก", type: "Smart Player" },
    ],
  }
];

const playerTypeDescriptions: Record<string, string> = {
  "Team Player":
    "คุณคือเพื่อนที่ทีมต้องการ (แต่ไม่ค่อยมีใครเป็น) คุณโยนปืนให้เพื่อนก่อนตัวเอง ซื้อ Utility ทุกตา และเล่น Agent ที่ไม่มีใครอยากเล่น เช่น Sage ในวันที่ทีมไม่มีคน Heal แต่ถ้าทีมเล่นแย่ คุณก็แบกไม่ไหวเหมือนกัน 🤡",

  "Eco Master":
    "เงินคือทุกสิ่ง! Sheriff + Light Shield = Meta 2024 คุณรู้จักบริหารเศรษฐกิจทีมดีกว่าโค้ช Valorant Pro แต่สุดท้ายคนที่บุกตายก็คือเพื่อนคุณ เพราะคุณเซฟทุกตา 🏦💰",

  Sniper:
    "Operator คือลมหายใจของคุณ ถ้าไม่มีปืนนี้ คุณจะรู้สึกเหมือนตัวเองเป็น Bronze 1 คุณยืนระยะไกลตลอดเวลา และถ้าคุณพลาดนัดเดียว คุณจะพิมพ์ 'WTF LAG?' เพื่อรักษาศักดิ์ศรี 🎯",

  Supporter:
    "คุณคือแม่พระประจำทีม! แจกปืน แจก Utility แต่สุดท้ายโดนด่าว่า 'ทำไมไม่ช่วยวะ?' ในขณะที่คุณเหลือ HP แค่ 10 และเพื่อนกำลัง AFK แถมยังถูกโยน Spike ใส่หน้าทุกตา 😭",

  คนรวย:
    "คุณไม่ได้มาเพื่อเล่นเกม แต่คุณมาเพื่อแฟชั่น! Prime, Oni, Champions—คุณมีหมด! ถ้าคุณยิงพลาด คุณจะบอกว่า 'เดี๋ยวเปลี่ยนสกินก่อน' และถ้าคุณตายเยอะ คุณจะเติมอีก 2,000 VP เพื่อให้ตัวเองรู้สึกดีขึ้น 💎🤑",

  Troller:
    "คุณเล่นเกมเพื่อเสียงหัวเราะ…ของตัวเอง คุณแฟลชใส่เพื่อนเป็นงานอดิเรก พิมพ์ 'FF go next' ตั้งแต่รอบสอง และเปิด Inspect ปืนในทุกสถานการณ์ (แม้จะโดนยิงอยู่) 🤡",

  "Clutch God":
    "คุณคือผู้เล่นที่เหลือคนสุดท้ายเสมอ (เพราะเพื่อนตายหมดแล้ว) และคุณสามารถแบกทีมได้...บางครั้ง ถ้าคุณยิงได้ clutch 1v3 คุณจะพิมพ์ 'EZZZZ' แต่ถ้าคุณพลาด คุณจะบอกว่า 'ยินดีด้วย พวกนายแพ้เอง' 🔥",

  "Entry Fragger":
    "คุณเกิดมาเพื่อบวก! 'เข้าไปดิพวกมึงรออะไร?!' คือคติประจำใจของคุณ ถึงแม้คุณจะเข้าไปตายก่อนทุกตาก็ตาม คุณไม่สน Utility ไม่สนเศรษฐกิจ ขอแค่ได้ยินเสียงปืนลั่นก็พอ 💀",

  "Smart Player":
    "คุณคิดมากกว่าคนทั้งทีมรวมกัน แต่สุดท้ายก็เล่นเองไม่ได้ คุณคอลแผนเหมือนเป็นโค้ช Sentinels แต่ตัวเองยิงพลาดแล้วโทษเมาส์ ถ้าทีมไม่เล่นตาม คุณจะพิมพ์ 'gg no comms' แล้วเงียบยาว 📊🧠",

  "Ninja Defuser":
    "คุณคือนินจาตัวจริงของ Valorant ถ้ามีควัน คุณจะเข้าไปกดค้าง ถ้าได้ยินเสียงศัตรู คุณจะหยุดกดแป๊บนึงให้ใจเต้น แล้วกดต่อ ถ้าคุณสำเร็จ เพื่อนจะสรรเสริญคุณ แต่ถ้าพลาด? 'Bro what are you doing?!' 🥷💀",

  "Toxic Player": 
    "คุณคือผู้พิทักษ์ความยุติธรรม(ในความคิดคุณ)! ชอบพิมพ์ 'EZ' เวลาชนะ แต่พิมพ์ 'Team Diff' เวลาแพ้ คุณมักจะบอกว่าติด Immortal แต่ดันเล่นใน Silver เพราะ 'เพื่อนชวน' ถ้าทีมเล่นไม่ดี คุณจะด่าทุกคน ยกเว้นตัวเอง และถ้าใครมาเถียง คุณจะท้าดวล 1v1 ทันที 😡🤬",
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
      <div className="mx-auto p-4  min-h-screen bg-gradient-to-b from-[#ff4655] to-[#0f1923] w-full">
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
