"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeUp, transition } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
};

export function Reveal({
  children,
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        ...transition,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}