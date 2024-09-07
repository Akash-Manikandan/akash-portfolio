"use client";

import * as React from "react";
import { MoonIcon, SunIcon, DesktopIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [ripple, setRipple] = React.useState<{ x: number; y: number; active: boolean } | null>(null);

  const handleThemeChange = (newTheme: string, e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const y = e.clientY;
    setRipple({ x, y, active: true });

    setTimeout(() => {
      setTheme(newTheme);
      setTimeout(() => setRipple(null), 1000); // Remove ripple after animation
    }, 300); // Delay theme change to allow ripple to start
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="drop-shadow-md" size="icon">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {["light", "dark", "system"].map((themeOption) => (
            <DropdownMenuItem
              key={themeOption}
              className="flex justify-between"
              onClick={(e) => handleThemeChange(themeOption, e)}
            >
              {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              {themeOption === "light" && <SunIcon className="h-[1.2rem] w-[1.2rem]" />}
              {themeOption === "dark" && <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
              {themeOption === "system" && <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {ripple && (
        <div
          className="fixed inset-0 pointer-events-none z-50"
          aria-hidden="true"
        >
          <span
            className={`absolute rounded-full ${theme === "dark" ? "bg-white" : "bg-gray-900"} opacity-10`}
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "10px",
              height: "10px",
              transform: "translate(-50%, -50%)",
              animation: "ripple 1s linear",
            }}
          />
        </div>
      )}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: translate(-50%, -50%) scale(200);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}