import { Navbar } from "@/components/layout/navbar";

type MarketingLayoutProps = {
  children: React.ReactNode;
};

export default function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}