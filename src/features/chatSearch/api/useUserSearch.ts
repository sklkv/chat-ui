import { useState, useEffect } from "react";
import { api } from "@shared/api";
import { IUserSearchResult } from "@shared/model";

export const useUserSearch = (query: string) => {
  const [results, setResults] = useState<IUserSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setIsLoading(true);
        const users = await api.searchUsers(query);
        setResults(users);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return { results, isLoading };
};
