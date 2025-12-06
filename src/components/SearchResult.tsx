"use client"
import { SearchResult } from "@/types/search";
import { useState } from "react";

export default function SearchResultCard({ result }: { result: SearchResult }) {
  const [showHtml, setShowHtml] = useState(false);
  const scorePercent = Math.round(result.score * 100);

  return (
    <article className="bg-one bg-opacity-10 border border-three p-5  shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-five">
            {result.content.slice(0, 120) || "Untitled chunk"}
          </h3>
          <p className="text-xs text-four mt-1">Path: {result.path}</p>
        </div>

        <span className="px-2 py-1 bg-three text-two rounded-sm w-24 text-xs text-center">
          {scorePercent}% match
        </span>
      </div>

      <button
        onClick={() => setShowHtml((v) => !v)}
        className="mt-3 text-xs text-three hover:underline"
      >
        {showHtml ? "Hide HTML" : "View HTML"}
      </button>

      {showHtml && (
        <pre className="mt-3 bg-two p-3  text-sm overflow-auto border border-four text-five">
          <code className="">{result.html_preview}</code>
        </pre>
      )}
    </article>
  );
}
