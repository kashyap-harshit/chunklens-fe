export interface SearchResult {
  content: string;
  score: number;
  path: string;
  token_count: number;
  html_preview: string;
}

export interface ApiSearchResponse {
  results: SearchResult[];
  total_chunks: number;
  query: string;
  url: string;
}
