import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Shared easing — "out-expo", the house curve for every reveal. */
export const EASE = [0.16, 1, 0.3, 1] as const;
