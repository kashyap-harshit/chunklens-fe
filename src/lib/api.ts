import { ApiSearchResponse } from "@/types/search";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function searchSite({
  url,
  query,
  top_k = 10,
}: {
  url?: string | null;
  query: string;
  top_k?: number;
}): Promise<ApiSearchResponse> {
  const res = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, query, top_k }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Search failed (${res.status})`);
  }

  return res.json();
}
