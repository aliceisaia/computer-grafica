import data from "./data/ricette.json";
import type { Recipe } from "./types";

// Unico punto in cui si legge il JSON: tutte le pagine usano questa lista
export const recipes = data.recipes as Recipe[];

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}
