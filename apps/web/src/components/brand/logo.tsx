import Link from "next/link";
import Image from "next/image";

import LogoImage from "@/images/logo.png";

type LogoProps = {
  showText?: boolean;
};

export function Logo({
  showText = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className="relative flex items-center gap-2"
    >
      <div
        className="
          relative
          flex h-8 w-8 items-center justify-center
          rounded-lg
          bg-indigo-500
        "
      >
        <Image
          src={LogoImage}
          width={24}
          height={24}
          alt="Flex Logo"
          className="rounded-lg object-contain"
        />
      </div>

      {showText && (
        <div className="relative">
          <span
            className="
              text-xl
              font-bold
              text-indigo-500
            "
          >
            Flex
          </span>

          <span
            className="
              absolute
              -right-7
              -top-1
              rounded-full
              border
              border-indigo-500/20
              bg-indigo-500/10
              px-1
              py-0.5
              text-[6px]
              font-semibold
              uppercase
              tracking-wide
              text-indigo-500
            "
          >
            Demo
          </span>
        </div>
      )}
    </Link>
  );
}