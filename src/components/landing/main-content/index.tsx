import CustomCamera from "@/components/ui-camera/camera";
import { CardContent } from "../card-content";

export const MainContent = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 space-y-14 bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Seção de título e descrição */}
      <section className="flex flex-col gap-2 items-center">
        <h1 className="text-5xl font-bold">Component Demos</h1>
        <p>
          Here are some of the UI Camera components that you can use in your
          projects.
        </p>
      </section>

      {/* Conteúdo principal */}
      <div className="z-10 flex flex-col w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex flex-col gap-10 h-48 w-full items-center justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <CardContent>
            <CustomCamera />
          </CardContent>

          <CardContent>
            <CustomCamera />
          </CardContent>

          <CardContent>
            <CustomCamera />
          </CardContent>

          <CardContent>
            <CustomCamera />
          </CardContent>
        </div>
      </div>
    </main>
  );
};
