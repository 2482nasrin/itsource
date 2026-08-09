'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CompareProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  model: string;
  brand: string;
  availability: string;
  rating: string;
  frequency?: string;
  connectionType?: string;
  cableLength?: string;
  connector?: string;
  drivers?: string;
  color?: string;
  warranty?: string;
}

interface CompareContextType {
  compareItems: CompareProduct[];
  addToCompare: (product: CompareProduct) => void;
  removeFromCompare: (id: number) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<CompareProduct[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('compare_products');
    if (saved) {
      try {
        setCompareItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const addToCompare = (product: CompareProduct) => {
    if (compareItems.some(item => item.id === product.id)) return;
    if (compareItems.length >= 4) return; // সর্বোচ্চ ৪টি
    const updated = [...compareItems, product];
    setCompareItems(updated);
    localStorage.setItem('compare_products', JSON.stringify(updated));
  };

  const removeFromCompare = (id: number) => {
    const updated = compareItems.filter(item => item.id !== id);
    setCompareItems(updated);
    localStorage.setItem('compare_products', JSON.stringify(updated));
  };

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};