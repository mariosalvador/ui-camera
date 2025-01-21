"use client"
import { ReactIcon, TailwindCSSIcon, TypescriptIcon } from "../Icon";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { GetStartedButton } from "./GetStartedButton";
import { Modal } from "@/components/ui/modal"; // Importação do novo componente Modal

export const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full bg-gray-50 dark:bg-black h-screen shadow-md border-b overflow-hidden">
      {/* Dot Pattern */}
      <div className="absolute inset-0 z-0">
        <DotPattern
          className={cn(
            "h-full w-full [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-20 dark:opacity-40"
          )}
        />
      </div>

      {/* Conteúdo */}
      <section className="relative z-10 flex flex-col items-center gap-8 pt-44 h-full">
        {/* Título */}
        <article className="flex flex-col items-center">
          <h1 className="text-5xl font-bold animate-pulse text-gray-900 dark:text-gray-100">
            UI Camera for
          </h1>
          <h1 className="text-5xl text-center font-bold animate-pulse text-gray-900 dark:text-gray-100">
            React Web Application
          </h1>
        </article>

        {/* Descrição */}
        <article className="flex flex-col items-center">
          <p className="text-center text-md text-gray-700 dark:text-gray-300">
            Open source component built for <strong>React</strong>,{" "}
            <strong>Typescript</strong>, and <strong>TailwindCSS</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Based in black and white theme
          </p>
        </article>

        {/* Botão */}
        <GetStartedButton onClick={handleOpenModal} />

        {/* Modal */}
        {isModalOpen && (
          <Modal onClose={handleCloseModal} />
        )}

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