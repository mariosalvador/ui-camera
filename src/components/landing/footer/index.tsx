"use client";
import Link from "next/link";
import { GitHubIcon } from "../Icon";
import { useTheme } from "@/module/context-theme/theme";

export const Footer = () => {
  const { theme } = useTheme();
  const getDate = () => new Date().getFullYear();
  return (
    <footer className="bg-white border-t dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-5 lg:py-5">
        <span className="flex flex-col items-center justify-center gap-2 w-full text-sm text-gray-500 sm:text-center dark:text-gray-400">
          ©  {getDate()}
          <Link href="https://github.com/mariosalvador" className=" flex items-center gap-1">
            <GitHubIcon height="24" width="24" isBlackMode={theme === 'dark'} />
            by:
             <span className="underline">Mário Salvador</span>
          </Link>
        </span>
      </div>
    </footer>
  );
};