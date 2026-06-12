import Image from "next/image";
import Link from "next/link";
import WordmarkLogo from "@/images/wordmark.png";
import WordmarkWhite from "@/images/wordmark-white.png";

import { Container } from "@/components/shared/container";

const productLinks = [
  {
    label: "Markets",
    href: "/market",
  },
  {
    label: "Agent",
    href: "/agent",
  },
  {
    label: "Research",
    href: "/research",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
];

const resourceLinks = [
  {
    label: "Documentation",
    href: "#",
  },
  {
    label: "GitHub",
    href: "https://github.com/limalime/flex",
  },
  {
    label: "X",
    href: "#",
  },
];

export function Footer() {
  return (
    <footer
      className="
        border-t
        border-indigo-800/20
        py-20
      "
    >
      <Container>
        <div
          className="
            grid gap-12
            lg:grid-cols-[1.5fr_1fr_1fr]
          "
        >
          {/* Brand */}
          <div>
            <div className="mb-6">
              {/* Light Mode */}
              <Image
                src={WordmarkLogo}
                alt="Flex"
                width={180}
                height={48}
                className="dark:hidden"
              />

              {/* Dark Mode */}
              <Image
                src={WordmarkWhite}
                alt="Flex"
                width={180}
                height={48}
                className="hidden dark:block"
              />
            </div>

            <p
              className="
                max-w-md
                text-sm
                leading-relaxed
                text-muted-foreground
              "
            >
              Flexible AI Prediction Market powered
              by Smart Accounts, ERC-7710 delegated
              permissions, autonomous agents, and
              modern Web3 infrastructure.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3
              className="
                mb-4
                font-semibold
              "
            >
              Product
            </h3>

            <div className="space-y-3">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    block
                    text-sm
                    text-muted-foreground
                    transition-colors
                    hover:text-indigo-500
                  "
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3
              className="
                mb-4
                font-semibold
              "
            >
              Resources
            </h3>

            <div className="space-y-3">
              {resourceLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="
                    block
                    text-sm
                    text-muted-foreground
                    transition-colors
                    hover:text-indigo-500
                  "
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          className="
            mt-16
            border-t
            border-indigo-800/20
            pt-8
          "
        >
          <div
            className="
              flex flex-col
              gap-4
              text-sm
              text-muted-foreground
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <p>
              © 2026 Flex. All rights reserved.
            </p>

            <p>
              Built on Base Sepolia for MetaMask Hackathon.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}