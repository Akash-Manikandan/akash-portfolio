import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type WithCircularReferences<T> = T & {
  next: string;
  prev: string;
};


export function linkItems<T extends { id: string }>(items: T[]): WithCircularReferences<T>[] {
  if (items.length === 0) return [];

  const linkedItems = items as WithCircularReferences<T>[];

  for (let i = 0; i < linkedItems.length; i++) {
    const nextIndex = (i + 1) % linkedItems.length;
    const prevIndex = (i - 1 + linkedItems.length) % linkedItems.length;

    linkedItems[i].next = linkedItems[nextIndex].id;
    linkedItems[i].prev = linkedItems[prevIndex].id;
  }

  return linkedItems;
}

