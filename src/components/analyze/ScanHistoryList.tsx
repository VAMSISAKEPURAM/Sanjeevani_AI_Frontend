'use client';

import { motion } from 'framer-motion';
import { Clock, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { ScanResult } from '@/hooks/useScanHistory';

interface ScanHistoryListProps {
  history: ScanResult[];
  onSelect: (scan: ScanResult) => void;
  onClear: () => void;
}

export default function ScanHistoryList({
  history,
  onSelect,
  onClear,
}: ScanHistoryListProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Scans
        </h3>
        <button
          onClick={onClear}
          className="text-sm text-destructive hover:bg-destructive/10 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
        >
          <Trash2 className="h-3 w-3" />
          Clear History
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {history.map((scan, index) => (
          <motion.div
            key={scan.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="min-w-[280px] bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all snap-start cursor-pointer group"
            onClick={() => onSelect(scan)}
          >
            <div className="relative h-32 w-full bg-muted">
              {scan.imagePreview && (
                <Image
                  src={scan.imagePreview}
                  alt={scan.disease}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-3">
                <span className="text-white text-xs font-medium">
                  {new Date(scan.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-foreground truncate">
                {scan.disease}
              </h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {scan.confidence}% Conf.
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
