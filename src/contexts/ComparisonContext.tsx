import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface ComparisonContextType {
  selectedSlugs: string[];
  addProduct: (slug: string) => void;
  removeProduct: (slug: string) => void;
  clearAll: () => void;
  isSelected: (slug: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const STORAGE_KEY = "al-comparison";
const MAX_PRODUCTS = 3;

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedSlugs));
  }, [selectedSlugs]);

  const addProduct = useCallback((slug: string) => {
    setSelectedSlugs((prev) => {
      if (prev.includes(slug) || prev.length >= MAX_PRODUCTS) return prev;
      return [...prev, slug];
    });
  }, []);

  const removeProduct = useCallback((slug: string) => {
    setSelectedSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clearAll = useCallback(() => setSelectedSlugs([]), []);

  const isSelected = useCallback((slug: string) => selectedSlugs.includes(slug), [selectedSlugs]);

  return (
    <ComparisonContext.Provider value={{ selectedSlugs, addProduct, removeProduct, clearAll, isSelected }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const ctx = useContext(ComparisonContext);
  if (!ctx) throw new Error("useComparison must be used within ComparisonProvider");
  return ctx;
};
