"use client";

import { DemoCameraOne } from "@/components/ui-camera/demo-example/demo-1";
import { CardContent } from "../card-content";
import { DemoCameraTwo } from "@/components/ui-camera/demo-example/demo-2";
import { DemoCameraThree } from "@/components/ui-camera/demo-example/demo-3";
import { DemoCameraFour } from "@/components/ui-camera/demo-example/demo-4";

export const MainContent = () => {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between  px-8 md:p-16 pb-2 space-y-14 bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Seção de título e descrição */}
      <section className="flex flex-col gap-2 pt-5 items-center text-center">
        <h1 className="text-5xl font-bold text-center">Component Demos</h1>
        <p>
          Here are some of the UI Camera components that you can use in your
          projects.
        </p>
      </section>

      {/* Conteúdo principal */}
      <div className=" flex flex-col w-full items-center justify-between font-mono text-sm lg:flex ">
        <div className=" flex flex-col gap-10 h-full w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black static  lg:bg-none">

          <CardContent>
            <DemoCameraOne/>
          </CardContent>

          <CardContent>
            <DemoCameraTwo/>
          </CardContent>

          <CardContent>
            <DemoCameraThree/>
          </CardContent>

          <CardContent>
            <DemoCameraFour/>
          </CardContent>
        </div>
      </div>
    </main>
  );
};
