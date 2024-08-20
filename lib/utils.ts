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

export function getLastUrlSegment(url: string): string {
  const segments = url.replace(/\/+$/, "").split("/");
  return segments.at(-1) || "";
}

export function getInitialsFromGitHub(githubUrl: string) {
  const username = getLastUrlSegment(githubUrl);
  if (!username) return "";
  const words = username.split(/[-_.]/);
  const initials = words[0][0] + (words[1] ? words[1][0] : "");
  return initials.toUpperCase();
}