"use client";

import { Body, Header } from "@/components/Home";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  "Hello",
  "こんにちは",
  "Hola",
  "Bonjour",
  "नमस्ते",
  "안녕하세요",
  "Olá",
  "Здравствуйте",
  "مرحبا",
  "你好",
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "transition" | "main">("intro");

  useEffect(() => {
    if (index < greetings.length) {
      const timer = setTimeout(() => setIndex((i) => i + 1), 250); // 1s per greeting
      return () => clearTimeout(timer);
    } else if (phase === "intro") {
      const timer = setTimeout(() => setPhase("transition"), 250);
      return () => clearTimeout(timer);
    }
  }, [index, phase]);

  return (
    <div className="relative w-screen h-screen overflow-x-hidden bg-gray-200">
      {phase === "transition" && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="z-0"
        >
          <Header />
          <Body />
        </motion.div>
      )}

      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: phase === "transition" ? "-100%" : 0,
        }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
        className="absolute top-0 left-0 w-full h-full z-30 bg-white flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold text-black animate-fadeInOut">
          {greetings[Math.min(index, greetings.length - 1)]}
        </h1>
      </motion.div>
    </div>
  );
}
