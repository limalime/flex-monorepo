import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/shared/container";

export function CTA() {
  return (
    <section
    id="cta"
    className="py-24">
      <Container>
        <Reveal>
        <div
          className="
            overflow-hidden
            rounded-[32px]
            border border-indigo-500/20
            bg-gradient-to-br
            from-indigo-950
            via-indigo-900
            to-indigo-800
            p-10
            text-white
            md:p-16
            shadow-xl
            shadow-indigo-400/50
          "
        >
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="
                mb-4 inline-flex
                rounded-full
                border border-white/10
                px-4 py-2
                text-sm
                text-white/80
              "
            >
              AI + Smart Accounts + ERC-7710
            </div>

            <h2
              className="
                text-4xl
                font-bold
                md:text-5xl
              "
            >
              Start Trading With AI Agents
            </h2>

            <p
              className="
                mt-6
                text-lg
                text-white/70
              "
            >
              Explore prediction markets,
              delegate permissions through
              ERC-7710, and let autonomous
              agents execute strategies on
              your behalf.
            </p>

            <div
              className="
                mt-10
                flex flex-col
                justify-center
                gap-4
                sm:flex-row
              "
            >
              <Link
                href="/markets"
                className="
                  rounded-2xl
                  bg-white
                  px-6 py-3
                  font-semibold
                  text-indigo-950
                  transition
                  hover:scale-[1.02]
                "
              >
                Explore Markets
              </Link>

              <Link
                href="/agent"
                className="
                  rounded-2xl
                  border border-white/20
                  px-6 py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
                Start Agent
              </Link>
            </div>
          </div>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}