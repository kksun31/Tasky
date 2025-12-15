"use server";

import { pexelsRandom, pexels } from "@/lib/pexels";

export async function getPexelsImages(count = 9) {
  const data = await pexelsRandom(count);
  return data.photos as Array<Record<string, any>>;
}

// если нужен поиск:
export async function searchPexelsImages(query: string, count = 9) {
  const data = await pexels(query, count);
  return data.photos as Array<Record<string, any>>;
}
