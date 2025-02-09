"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

const questions = [
  {
    id: 1,
    question: "เพื่อนในทีมกำลังคอลแผนกันอย่างจริงจัง คุณจะ…",
    options: [
      { text: "เปิดไมค์แทรกแล้วพูด \"เดี๋ยวเล่นตามน้ำ\"", type: "Baiter" },
      { text: "ไม่สนใจ แล้ววิ่งเข้ากลางแมพทันที", type: "Yasuo Main" },
      { text: "เงียบฟัง แล้วก็เล่นตามใจตัวเองอยู่ดี", type: "Lone Wolf" },
      { text: "เปิดสตรีม Valorant Pro แล้วบอกเพื่อนว่า \"ตามนี้\"", type: "Analyst Wannabe" },
      { text: "เปิดไมค์แล้วตะโกน \"FF ไหมวะ?\"", type: "Troller" },
      { text: "ใช้เสียง AI โม้ใส่เพื่อนว่าตัวเอง Radiant", type: "Scammer" }
    ]
  },
  {
    id: 2,
    question: "เพื่อนพิมพ์ว่า \"อย่าพึ่งเข้าไซต์\" แต่คุณอยู่หน้าทางเข้าแล้ว คุณจะทำยังไง?",
    options: [
      { text: "แอบรอข้าง ๆ เผื่อมีคนวิ่งออกมาให้ยิง", type: "Lurker" },
      { text: "แกล้งเดินเข้าไป แล้วพิมพ์ \"โอ๊ะ ขอโทษ\"", type: "Baiter" },
      { text: "เข้าไปเต็มสปีด เปิด Flash ใส่เพื่อนก่อน", type: "Yasuo Main" },
      { text: "กด Inspect ปืนให้ศัตรูเห็นก่อนลั่นกระสุน", type: "คนรวย" },
      { text: "พิมพ์ \"โทษๆ เมาส์หลุด\" แล้วกด Alt+F4", type: "Troller" },
      { text: "นั่งย่องในควัน 5 นาที รอศัตรูออกมาเอง", type: "Ninja" }
    ]
  },
  {
    id: 3,
    question: "ถ้าคุณมี Operator อยู่ แล้วเพื่อนขอดรอปปืน คุณจะ…",
    options: [
      { text: "พิมพ์ \"Sorry, no money\" ทั้งที่มี 9,000 เครดิต", type: "คนรวยขี้งก" },
      { text: "ดรอปปืน Ghost ให้แทน แล้วบอก \"ใช้ดีนะ\"", type: "Supporter กวนตีน" },
      { text: "หันไปยิงเพื่อน 1 นัด แล้วพิมพ์ \"Oops\"", type: "Troller" },
      { text: "เปิดไมค์แล้วบอก \"เล่น Sheriff สิ แรงกว่า\"", type: "Eco Master" },
      { text: "ตอบแค่ว่า \"?\"", type: "Toxic King" },
      { text: "ดรอป Operator ให้เพื่อน แล้วซื้ออีกกระบอก", type: "คนรวย" }
    ]
  },
  {
    id: 4,
    question: "เมื่อถึงรอบ Pistol Round คุณจะซื้ออะไร?",
    options: [
      { text: "Sheriff + คำพูดติดปาก \"One tap easy\"", type: "Sheriff God" },
      { text: "Frenzy + วิ่งไล่ยิงเหมือน Doom Guy", type: "Run & Gun Master" },
      { text: "ไม่ซื้ออะไรเลย เพราะเศรษฐกิจสำคัญกว่า", type: "ประหยัดสุดในทีม" },
      { text: "Shorty แล้วซ่อนมุมหวัง One Shot Kill", type: "Rat Player" },
      { text: "เปิด Battle Pass แล้วเติม VP ซื้อสกินก่อน", type: "คนรวย" },
      { text: "ขายของจนหมด แล้วพิมพ์ \"Knife only?\"", type: "Troller" }
    ]
  },
  {
    id: 5,
    question: "ทีมคุณเหลือ 3 คน เจอศัตรู 5 คน คุณจะ…",
    options: [
      { text: "พิมพ์ \"GG go next\" แล้วเดินเข้าให้ศัตรูยิง", type: "ใจบาง" },
      { text: "วิ่งหนีไปเซฟปืน แล้วโดนด่าใน Voice Chat", type: "Smart Player" },
      { text: "เปิด Flash ใส่เพื่อนแล้วบอก \"ช่วยไม่ได้\"", type: "Yasuo Main" },
      { text: "กด Inspect ปืนแล้วเดินออกไปให้โดนยิงเท่ ๆ", type: "คนรวย" },
      { text: "นั่งย่องรอ 2 นาที แล้วโดนยิงตายเพราะโดนสแกน", type: "Lurker" },
      { text: "วิ่ง Knife ใส่ศัตรูแล้วพิมพ์ \"You scared?\"", type: "Troller" }
    ]
  },
  {
    id: 6,
    question: "ถ้าคุณแพ้ติดกัน 5 รอบ คุณจะทำอะไร?",
    options: [
      { text: "โทษเพื่อนว่า \"ทีมอะไรวะเนี้ย\"", type: "Toxic King" },
      { text: "AFK แล้วเปิด YouTube ดูวิธี Aim", type: "Analyst Wannabe" },
      { text: "เติมเงินซื้อสกินเพิ่ม เผื่อยิงแม่นขึ้น", type: "คนรวย" },
      { text: "ไปเล่นมุมเดิมทุกตา หวังว่าสักรอบจะเวิร์ค", type: "หัวรั้น" },
      { text: "เดิน Knife เท่านั้น เพราะไม่อยากเสียเงินซื้อปืน", type: "Troller" },
      { text: "เปลี่ยนชื่อเป็น \"FF GO NEXT\" แล้วออกเกม", type: "Quitter" }
    ]
  }
]

const playerTypeDescriptions: Record<string, string> = {
  "Troller": "คุณคือคนที่เล่นขำ ๆ ไม่สนอะไรทั้งนั้น ไม่ว่าจะโยนปืนผิด ขว้าง Flash ใส่เพื่อน หรือเปิด Inspect ให้ศัตรูดู สไตล์การเล่นของคุณคือ หัวร้อนแล้ว AFK, กด Tab ดูสกอร์ทุก 5 วิ, พิมพ์กวนตีนนิด ๆ คำพูดติดปากของคุณคือ \"แค่เกมป่ะ?\"",
  "คนรวย": "เติมทุกสกินใหม่ มี Prime, Oni, Champions ครบ ไม่สนฝีมือ ยิงไม่แม่นแต่เท่ไว้ก่อน สไตล์การเล่นของคุณคือ Inspect ปืน 80% ของเกม, ซื้อ Operator ทุกรอบ, ซื้อสกินเซ็ตใหม่ก่อนเพื่อน คำพูดติดปากของคุณคือ \"สกินสวยไว้ก่อน ฝีมือเดี๋ยวตามมา\"",
  "Yasuo Main": "เปิด Flash ใส่เพื่อน วิ่งเข้าคนแรกตลอด ไม่สนว่าจะชนะหรือแพ้ ขอแค่ได้บวก สไตล์การเล่นของคุณคือ ไม่ซื้อ Utility, โวยวายถ้าทีมไม่ตาม, \"ฉันคือ Duelist\" แม้จะเล่น Sage คำพูดติดปากของคุณคือ \"เข้าไปดิพวกมึงรออะไร!?\"",
  "Lurker": "อยู่คนละฝั่งแมพตลอด เพื่อนบุก A คุณไป B ศัตรูลง B คุณอยู่ A ไม่เคยเข้าไซต์พร้อมทีม สไตล์การเล่นของคุณคือ นั่งย่อง 90% ของเวลา, โดนด่าเพราะตายหลังเพื่อนหมด, มักจะมีปืนตอนเซฟ คำพูดติดปากของคุณคือ \"พวกมึงอย่าเพิ่งตายนะ เดี๋ยวเข้าไปช่วย\"",
  "Baiter": "อยู่หลังสุดเสมอ ไม่เคยเป็นคนแรกที่เข้าไซต์ ชอบให้เพื่อนเป็นโล่ก่อนแล้วค่อยยิง สไตล์การเล่นของคุณคือ \"ไปก่อนเลยพี่ เดี๋ยวตาม\", โทษเพื่อนว่า \"ทำไมตายเร็วจังวะ\", ขโมย Kill ตอนเพื่อนยิงเกือบตาย คำพูดติดปากของคุณคือ \"เฮ้ยกูยิงมันแล้วนะ ทำไมไม่ตายวะ?\"",
  "Analyst Wannabe": "พูดมากกว่าทำ สั่งเพื่อนคอลแผน แต่ตัวเองไม่เล่นตามที่พูด สไตล์การเล่นของคุณคือ เปิดสตรีม Valorant Pro ทิ้งไว้, พิมพ์สอนเพื่อนทั้งเกม, หัวร้อนเมื่อเพื่อนไม่ทำตาม คำพูดติดปากของคุณคือ \"เราควรเล่นช้า ๆ\" (แต่ตัวเองวิ่งบวก)",
  "Toxic King": "คุณคือราชาแห่งความ Toxic ชอบด่าเพื่อนร่วมทีม และมักจะโทษคนอื่นเสมอเมื่อแพ้",
  "Smart Player": "คุณเป็นผู้เล่นที่ฉลาด รู้จักการอ่านเกม และวางแผนการเล่น แม้บางครั้งอาจจะดูขี้ขลาดไปหน่อย",
  "Ninja": "คุณชอบการแอบซ่อน และหาจังหวะเล่นแบบเงียบๆ เน้นการเอาตัวรอดและทำคะแนนแบบไม่ให้ใครรู้ตัว",
  "Sheriff God": "คุณเชื่อว่าตัวเองเป็นเทพแห่ง Sheriff แม้ความจริงอาจจะไม่เป็นอย่างนั้น",
  "Run & Gun Master": "คุณชอบการวิ่งและยิงไปด้วย ไม่สนใจความแม่นยำ ขอแค่ได้ยิง",
  "ประหยัดสุดในทีม": "คุณเป็นคนประหยัด ชอบเซฟเงิน แม้บางครั้งจะทำให้ทีมเสียเปรียบก็ตาม",
  "Rat Player": "คุณชอบการแอบซุ่ม และหาจังหวะทำคะแนนแบบไม่ให้ใครคาดคิด",
  "ใจบาง": "คุณเป็นคนใจไม่แข็งพอ มักจะยอมแพ้ง่ายๆ เมื่อเจอสถานการณ์ที่ยากลำบาก",
  "หัวรั้น": "คุณเป็นคนหัวรั้น ชอบทำอะไรซ้ำๆ แม้จะไม่ได้ผลก็ตาม",
  "Quitter": "คุณเป็นคนที่มักจะยอมแพ้ง่ายๆ และชอบออกจากเกมเมื่อรู้สึกว่าไม่ไหวแล้ว"
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const calculateResult = () => {
    const types = answers.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(types).sort((a, b) => b[1] - a[1])[0][0]
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  if (showResult) {
    const result = calculateResult()
    return (
      <div className="container mx-auto p-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>ผลการทำแบบทดสอบ</CardTitle>
            <CardDescription>คุณเป็นผู้เล่นประเภท:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-bold text-center">{result}</h2>
            <p className="text-center">{playerTypeDescriptions[result]}</p>
            <Button 
              className="w-full mt-4" 
              onClick={restartQuiz}
            >
              เริ่มทำแบบทดสอบใหม่
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>คุณเป็นผู้เล่น Valorant แบบไหน? 🎯🔥</CardTitle>
          <CardDescription>ตอบคำถามทั้งหมด 6 ข้อเพื่อค้นหาตัวตนของคุณ</CardDescription>
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
  )
}
