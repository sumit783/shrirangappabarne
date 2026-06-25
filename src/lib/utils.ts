import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}
