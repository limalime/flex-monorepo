"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { fadeLeft, fadeUp, transition } from "@/lib/motion";
import { Container } from "@/components/shared/container";

import { MarketPreview } from "./market-preview";

export function Hero() {
  return (
    <section
    id="hero"
    className="py-24">
      <Container>
        <div
          className="
            grid gap-12
            lg:grid-cols-2
            lg:items-center
          "
        >
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                ...transition,
                delay: 0.1,
              }}
              className="
                mb-4 inline-flex
                rounded-full
                border border-indigo-500/20
                px-4 py-2
                text-sm
                shadow-md
                shadow-indigo-400
              "
            >
              AI + Smart Accounts + ERC-7710
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                ...transition,
                delay: 0.2,
              }}
              className="
                text-5xl
                font-bold
                tracking-tight
                md:text-6xl
              "
            >
              Flexible AI Prediction Market
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                ...transition,
                delay: 0.3,
              }}
              className="
                mt-6
                max-w-xl
                text-lg
                text-muted-foreground
              "
            >
              Trade manually or let AI execute
              prediction strategies using
              Smart Accounts, ERC-7710
              permissions, and autonomous
              agents.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                ...transition,
                delay: 0.4,
              }}
              className="mt-8 flex gap-4"
            >
              <Link
                href="/markets"
                className="
                  rounded-xl
                  bg-indigo-500
                  px-6 py-3
                  font-medium
                  text-white
                  transition-all
                  hover:bg-indigo-600
                  hover:scale-[1.02]
                "
              >
                Explore Markets
              </Link>

              <Link
                href="/agent"
                className="
                  rounded-xl
                  border
                  px-6 py-3
                  font-medium
                  transition-all
                  hover:bg-indigo-500/5
                  hover:scale-[1.02]
                "
              >
                Start Agent
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            transition={{
              ...transition,
              delay: 0.5,
            }}
          >
            <MarketPreview />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}