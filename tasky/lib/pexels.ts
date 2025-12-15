const PEXELS_API_URL = "https://api.pexels.com/v1";

export async function pexels(query: string, perPage = 10) {
  const res = await fetch(
    `${PEXELS_API_URL}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&people=false`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY!,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch photos from Pexels");
  }

  return res.json();
}

export async function pexelsRandom(perPage = 9) {
  const res = await fetch(
    `https://api.pexels.com/v1/curated?per_page=${perPage}&people=false`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY!,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch curated photos");
  }

  return res.json();
}