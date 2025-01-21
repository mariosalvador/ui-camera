import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ChevronRight } from "lucide-react";

interface GetStartedButtonProps {
  onClick: () => void;
}

export const GetStartedButton = ({ onClick }: GetStartedButtonProps) => (
  <ShimmerButton
    className="flex justify-between shadow-2xl px-2 py-3 rounded-[20px] w-max h-[40px] bg-white dark:bg-gray-800 dark:text-gray-100"
    onClick={onClick}
    type="button"
  >
    <span className="flex w-full justify-between text-md items-center gap-5 whitespace-pre-wrap leading-none tracking-tight">
      Get started
      <ChevronRight
        size={16}
        className="hover:animate-ping text-gray-700 dark:text-gray-300"
      />
    </span>
  </ShimmerButton>
);
