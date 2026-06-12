import {
  AgentWorkspace,
} from "@/components/agent/workspace";

import {
  AgentProvider,
} from "@/providers/agent";

export default function AgentPage() {
  return (
    <AgentProvider>
      <AgentWorkspace />
    </AgentProvider>
  );
}