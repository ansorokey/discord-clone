import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// This will allow us to create custom classes
export function cn(...inputs: ClassValue[]) {
  // the merge overrides similar values in clas parameters
  return twMerge(clsx(inputs))
}
