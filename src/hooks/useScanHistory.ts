import { useState, useEffect } from 'react';

export interface ScanResult {
  id: string;
  date: number;
  disease: string;
  confidence: number;
  chemical_pesticides: string;
  chemical_dosage_per_ha: string;
  organic_pesticides: string;
  organic_dosage_per_ha: string;
  cause_prevention: string;

  imagePreview: string; // Base64 thumbnail or URL
}

const STORAGE_KEY = 'sanjeevani_scan_history';
const MAX_HISTORY = 10;

export const useScanHistory = () => {
  const [history, setHistory] = useState<ScanResult[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load scan history:', error);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const saveScan = (scan: Omit<ScanResult, 'id' | 'date'>) => {
    try {
      const newScan: ScanResult = {
        ...scan,
        id: crypto.randomUUID(),
        date: Date.now(),
      };

      const updatedHistory = [newScan, ...history].slice(0, MAX_HISTORY);

      setHistory(updatedHistory);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

      return newScan;
    } catch (error) {
      console.error('Failed to save scan:', error);
      return null;
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const deleteScan = (id: string) => {
    const updatedHistory = history.filter((scan) => scan.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  return {
    history,
    saveScan,
    clearHistory,
    deleteScan,
  };
};
