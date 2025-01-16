import { ShimmerButton } from "@/components/ui/shimmer-button"
import { ChevronRight } from "lucide-react"
import { ReactIcon, TailwindCSSIcon, TypescriptIcon } from "../Icon"


export const HeroSection = () => {

  return (
    <div className="w-full bg-gray-50 h-screen">

      <section className="flex flex-col items-center gap-8 pt-40  h-full">

        <article className="flex flex-col items-center">
          <h1 className="text-5xl font-bold animate-pulse">UI Camera for </h1>
          <h1 className="text-5xl font-bold  animate-pulse">React Web Aplication</h1>
        </article>
        <article className="flex flex-col items-center">
          <p className="text-center text-md ">Open source component built for <strong>React</strong>, <strong>Typescript</strong> and <strong>TailwindCSS</strong>
          </p>
          <p>Based in black and white theme</p>
        </article>
        <ShimmerButton className=" flex justify-between shadow-2xl px-2 py-3 rounded-[20px] w-max h-[40px] 	">
          <span className=" flex w-full justify-between text-md items-center gap-5 whitespace-pre-wrap leading-none tracking-tight">
            Get started
            <ChevronRight size={16} className="hover:animate-ping" />
          </span>
        </ShimmerButton>

        <article className="flex gap-5">
          <ReactIcon size="30" />
          <TypescriptIcon size="30" />
          <TailwindCSSIcon size="30" />
        </article>
      </section>
    </div>
  )
}