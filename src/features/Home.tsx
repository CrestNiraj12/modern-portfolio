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
      const timer = setTimeout(
        () => setIndex((i) => i + 1),
        index === 0 ? 500 : 150,
      );
      return () => clearTimeout(timer);
    } else if (phase === "intro") {
      const timer = setTimeout(() => setPhase("transition"), 250);
      return () => clearTimeout(timer);
    }
  }, [index, phase]);

  useEffect(() => {
    if (phase !== "transition") {
      return;
    }

    const timer = setTimeout(() => setPhase("main"), 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-background">
      {phase !== "intro" && (
        <motion.div
          initial={{ y: "50%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className={
            phase === "transition"
              ? "absolute inset-0 z-20 overflow-hidden bg-background"
              : "relative z-20 bg-background"
          }
        >
          <Header />
          <Body />
        </motion.div>
      )}

      {phase !== "main" && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: phase === "transition" ? "-100%" : 0,
            borderRadius: phase === "transition" ? "50%" : "0%",
            opacity: 100,
          }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-30 flex items-center justify-center bg-background"
        >
          <h1 className="text-4xl font-bold text-white animate-fadeInOut">
            {greetings[Math.min(index, greetings.length - 1)]}
          </h1>
        </motion.div>
      )}
    </div>
  );
}
