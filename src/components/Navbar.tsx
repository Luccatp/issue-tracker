import { FC } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight, Bug, BugPlay } from "lucide-react";
import MobileNav from "./MobileNav";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className="flex z-40 font-semibold hover:text-primary duration-500"
          >
            <span>
              <BugPlay />
            </span>
          </Link>

          <MobileNav />

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Ver chamados
              </Link>
              <Link
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
                href={"/issues/new"}
              >
                Criar um novo chamado
              </Link>
              <Link
                className={buttonVariants({
                  size: "sm",
                  variant: "secondary",
                })}
                href={"/sign-up"}
              >
                Admin Login
              </Link>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
