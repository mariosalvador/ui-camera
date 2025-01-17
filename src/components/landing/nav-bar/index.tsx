"use client";
import Image from "next/image";
import Link from "next/link";
import { GitHubIcon } from "../Icon";
import { ThemeToggle } from "@/module/context-theme/toogleThemeButton";
import { useTheme } from "@/module/context-theme/theme";

export const NavBar = () => {
  const {theme} = useTheme();
  return (
    <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full bg-white dark:bg-zinc-900 backdrop-blur-lg shadow-sm px-5 py-2 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <section className="flex items-center gap-5">
          <Image
            src="/ui-camera-white-mode-svg.svg"
            alt="Logo"
            width={120}
            height={120}
            className="dark:hidden" // Mostra no modo claro
          />
          <Image
            src="/ui-camera-black-mode-svg.svg"
            alt="Logo"
            width={120}
            height={120}
            className="hidden dark:block my-2" // Mostra no modo escuro
          />
          <div className="text-xs font-semibold rounded-md bg-gray-100/80 dark:bg-gray-800/70 dark:text-gray-200 shadow-sm px-2 animate-pulse border-[0.5px] border-black/70 dark:border-gray-600">
            Beta version
          </div>
        </section>
        <nav className="flex items-center gap-5">
          <Link
            href="https://github.com/mariosalvador/ui-camera"
            target="_blank"
            className="text-gray-800 hover:text-black dark:text-gray-200 dark:hover:text-white"
          >
            <GitHubIcon height="24" width="24" isBlackMode={theme === 'dark'}  />
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
