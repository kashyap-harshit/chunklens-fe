"use client";

import React, { useState } from "react";
import { SearchResult } from "@/types/search";
import { searchSite } from "@/lib/api";
import SearchResultCard from "@/components/SearchResult";
import { Globe, Search } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string>("");

  async function onSearch(e?: React.FormEvent) {
    e?.preventDefault();
    setError("");

    if (!query.trim()) {
      setError("Please enter a search query.");
      return;
    }

    setLoading(true);

    try {
      const data = await searchSite({
        url: url || null,
        query,
        top_k: 10,
      });

      setResults(data.results);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-two p-6 text-five">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-white">
            Website Content Search
          </h1>
          <p className="mt-2 text-four">
            Search through website content with precision
          </p>
        </header>

        <form onSubmit={onSearch} className="space-y-4">
          <div className="bg-one bg-opacity-10 border border-three  p-4 flex gap-3 items-center shadow">
            <Globe className="text-four w-5 h-5" />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com (optional)"
              className="w-full outline-none text-sm bg-transparent text-five placeholder-four"
            />
          </div>

          <div className="bg-one bg-opacity-10 border border-three  p-4 flex gap-3 items-center shadow">
            <Search className="text-four w-5 h-5" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search query"
              className="w-full outline-none text-sm bg-transparent text-five placeholder-four"
            />

            <button
              type="submit"
              disabled={loading}
              className={`
                ml-2 px-4 py-2  text-two font-medium transition
                ${
                  loading
                    ? "bg-three opacity-50"
                    : "bg-none border border-three text-white hover:bg-three"
                }
              `}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {error && <div className="mt-4 text-red-400 text-sm">{error}</div>}

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white mb-4">
            Search Results
          </h2>

          <div className="space-y-6">
            {results.length === 0 && (
              <div className="text-four">
                No results yet. Try searching for something.
              </div>
            )}

            {results.map((r, idx) => (
              <SearchResultCard key={idx} result={r} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
