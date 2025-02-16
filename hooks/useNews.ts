import { NewsCategory, NewsItem } from "@/types/news";
import { fetchApiData } from "@/services/api";
import { useState, useCallback } from "react";

export const useNews = (initialCategory: NewsCategory = "general") => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] =
    useState<NewsCategory>(initialCategory);

  const fetchNews = useCallback(
    async (category?: NewsCategory) => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchApiData({
          category: category || currentCategory,
        });

        setNews(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    [currentCategory]
  );

  return {
    news,
    loading,
    error,
    fetchNews,
    currentCategory,
    setCurrentCategory,
  };
};
