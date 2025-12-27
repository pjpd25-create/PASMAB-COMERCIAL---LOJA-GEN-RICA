
import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'view_history_angola';
const MAX_HISTORY = 10;

export const useHistory = () => {
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const trackProduct = useCallback((productId: string) => {
    setHistory((prev) => {
      const newHistory = [productId, ...prev.filter(id => id !== productId)].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  return { history, trackProduct };
};
