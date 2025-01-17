import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ChevronRight } from "lucide-react";
import { ReactIcon, TailwindCSSIcon, TypescriptIcon } from "../Icon";

export const HeroSection = () => {
  return (
    <div className="w-full bg-gray-50 dark:bg-black h-screen">
      <section className="flex flex-col items-center gap-8 pt-44 h-full">
        {/* Título */}
        <article className="flex flex-col items-center">
          <h1 className="text-5xl font-bold animate-pulse text-gray-900 dark:text-gray-100 ">
            UI Camera for
          </h1>
          <h1 className="text-5xl font-bold animate-pulse text-gray-900 dark:text-gray-100">
            React Web Application
          </h1>
        </article>

        {/* Descrição */}
        <article className="flex flex-col items-center">
          <p className="text-center text-md text-gray-700 dark:text-gray-300 ">
            Open source component built for <strong>React</strong>,{" "}
            <strong>Typescript</strong>, and <strong>TailwindCSS</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Based in black and white theme
          </p>
        </article>

        {/* Botão */}
        <ShimmerButton className="flex justify-between shadow-2xl px-2 py-3 rounded-[20px] w-max h-[40px] bg-white dark:bg-gray-800 dark:text-gray-100">
          <span className="flex w-full justify-between text-md items-center gap-5 whitespace-pre-wrap leading-none tracking-tight">
            Get started
            <ChevronRight
              size={16}
              className="hover:animate-ping text-gray-700 dark:text-gray-300"
            />
          </span>
        </ShimmerButton>

        {/* Ícones */}
        <article className="flex gap-5">
          <ReactIcon size="30" />
          <TypescriptIcon size="30" />
          <TailwindCSSIcon size="30" />
        </article>
      </section>
    </div>
  );
};