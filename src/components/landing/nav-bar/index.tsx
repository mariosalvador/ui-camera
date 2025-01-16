import { Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { GitHubIcon } from "../Icon"

export const NavBar = () => {
  return (
    <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full bg-background/40 backdrop-blur-lg shadow-sm px-5 py-2">
      <div className="flex items-center justify-between">
        <section className="flex items-center gap-5">
          <Image
            src="/ui-camera-white-mode-svg.svg"
            alt="Logo"
            width={120}
            height={120}
          />
          <div className="text-xs font-semibold rounded-md bg-gray-100/80 shadow-sm px-2 animate-pulse border-[0.5px] border-black/70 ">
            Beta version
          </div>
        </section>
        <nav className="flex items-center gap-5">
          <Link href="https://github.com/mariosalvador/ui-camera" target="_blank" >
            <GitHubIcon height="24" width="24" />
          </Link>
          <Sun className="h-5.5 w-5.5 cursor-pointer" />
        </nav>
      </div>
    </header>
  )
}