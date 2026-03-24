import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatMarks(obtained: number, total: number): string {
  return `${obtained}/${total}`;
}

export function getClassLabel(classLevel: number): string {
  return classLevel <= 5
    ? `Class ${classLevel} (Primary)`
    : classLevel <= 8
      ? `Class ${classLevel} (Middle)`
      : classLevel <= 10
        ? `Class ${classLevel} (Secondary)`
        : `Class ${classLevel} (Senior Secondary)`;
}
