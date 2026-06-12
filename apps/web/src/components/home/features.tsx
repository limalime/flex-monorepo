import { Container } from "@/components/shared/container";
import { features } from "@/lib/mock/features";
import { Reveal } from "@/components/shared/reveal";

export function Features() {
  return (
    <section
    id="features"
    className="py-24">
      <Container>
        <Reveal>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Built for Autonomous Trading
          </h2>

          <p className="mt-4 text-muted-foreground">
            Powered by modern account abstraction
            and AI infrastructure.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                rounded-3xl
                border
                border-indigo-800/20
                bg-background
                p-6
                transition-all
                hover:-translate-y-1
                hover:border-indigo-500/30
              "
            >
              <feature.icon
                className="
                  mb-4 h-10 w-10
                  text-indigo-500
                "
              />

              <h3 className="mb-2 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        </Reveal>
      </Container>
    </section>
  );
}