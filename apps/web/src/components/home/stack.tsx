import Image from "next/image";

import { Container } from "@/components/shared/container";
import { stack } from "@/lib/mock/stack";
import { Reveal } from "@/components/shared/reveal";

function LogoRow({
  items,
  reverse = false,
}: {
  items: {
    name: string;
    logo: string;
  }[];
  reverse?: boolean;
}) {
  const duplicated = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={[
          "flex min-w-max gap-16",
          reverse
            ? "animate-marquee-right"
            : "animate-marquee-left",
        ].join(" ")}
      >
        {duplicated.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="
              flex h-20 items-center
              justify-center
            "
          >
            <Image
              src={item.logo}
              alt={item.name}
              width={140}
              height={40}
              className="
                h-10
                w-auto
                opacity-60
                grayscale
                transition-all
                duration-300
                hover:opacity-100
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  return (
    <section
    id="stack"
    className="py-24">
      <Container>
        <Reveal>
        <div className="mb-12 text-center">
          <div
            className="
              mb-4 inline-flex
              rounded-full
              border border-indigo-500/20
              px-4 py-2
              text-sm
            "
          >
            Industry-Leading Infrastructure
          </div>

          <h2 className="text-4xl font-bold">
            Built With The Best
          </h2>

          <p
            className="
              mx-auto mt-4 max-w-2xl
              text-muted-foreground
            "
          >
            Flex combines AI agents,
            Smart Accounts, delegated
            permissions, and modern Web3
            infrastructure to create a
            next-generation prediction
            market experience.
          </p>
        </div>

        <div className="space-y-8 dark:bg-white">
          <LogoRow items={stack}
          reverse />
        </div>
        </Reveal>
      </Container>
    </section>
  );
}