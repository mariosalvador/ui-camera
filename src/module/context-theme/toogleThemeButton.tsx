"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-sm font-medium bg-gray-200 rounded-md dark:bg-gray-800 dark:text-white"
    >
      {theme === 'light' ? (
        <Sun className="h-5.5 w-5.5 cursor-pointer" />
      ) : (
        <Moon className="h-5.5 w-5.5 cursor-pointer" />
      )
      }
    </button>
  );
};