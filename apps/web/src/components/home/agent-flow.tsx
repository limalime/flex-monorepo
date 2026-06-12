import { Container } from "@/components/shared/container";
import { agentFlow } from "@/lib/mock/agent-flow";
import { Reveal } from "@/components/shared/reveal";

export function AgentFlow() {
  return (
    <section
    id="agent-flow"
    className="py-24">
      <Container>
        <Reveal>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Autonomous Trading Workflow
          </h2>

          <p className="mt-4 text-muted-foreground">
            Let AI discover opportunities,
            purchase research, execute trades,
            and claim rewards automatically.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {agentFlow.map((step, index) => (
            <div
              key={step.title}
              className="
                relative
                rounded-3xl
                border border-indigo-800/20
                p-6
                transition-all
                hover:-translate-y-1
                hover:border-indigo-500/30
              "
            >
              <div
                className="
                  mb-6
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-indigo-500/10
                "
              >
                <step.icon
                  className="
                    h-7 w-7
                    text-indigo-500
                  "
                />
              </div>

              <div
                className="
                  mb-3
                  text-sm
                  font-medium
                  text-indigo-500
                "
              >
                Step {index + 1}
              </div>

              <h3 className="mb-3 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div
        className="
        mt-12
        rounded-3xl
        border border-cyan-400/20
        bg-gradient-to-r
        from-indigo-950
        via-indigo-900
        to-indigo-800
        p-8
        text-white
        shadow-xl
        shadow-indigo-400/50
        "
        >
          <h3 className="text-2xl font-bold">
            Agent Mode Powered by ERC-7710
          </h3>
            
          <p className="mt-3 max-w-2xl text-white/80">
              Grant limited permissions to your AI agent and let it execute prediction strategies without exposing full wallet control.
          </p>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}