import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 pb-24 lg:pb-0">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}