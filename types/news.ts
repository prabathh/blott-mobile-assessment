export type NewsCategory = "general" | "forex" | "crypto" | "merger";

export interface NewsItem {
  id: number;
  category: NewsCategory;
  datetime: number;
  headline: string;
  image: string;
  related: string[];
  source: string;
  summary: string;
  url: string;
}

export interface NewsState {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  lastMinId: number | null;
  currentCategory: NewsCategory;
}
