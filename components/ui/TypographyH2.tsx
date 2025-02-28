import { cn } from "@/lib/utils"

import type { JSX } from "react";

export function TypographyH2({ children, className }: { children: JSX.Element, className?: string }) {
  return (
    <h2 className={cn(
      "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ",
      className
    )} >
      {children}
    </h2>
  );
}
